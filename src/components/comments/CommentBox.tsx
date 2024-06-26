import AuthContext from "context/AuthContext";
import firebase from "firebase/compat/app";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home/Home";
import { useContext } from "react";
import { toast } from "react-toastify";
import styles from "./CommentBox.module.scss";
import useTranslation from "hooks/useTranslation";
import PROFILE_DEFAULT_URL from "constants/defaultProfileImage";

export interface CommentProps {
  comment: string;
  uid: string;
  displayName: string;
  createdAt: firebase.firestore.Timestamp;
  photoURL: string;
}

interface CommentBoxProps {
  data: CommentProps;
  post: PostProps;
}

export default function CommentBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const translate = useTranslation();

  const formattedDate = data.createdAt.toDate().toLocaleDateString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDeleteComment = async () => {
    if (post) {
      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast(translate("TOAST_DELETE_REPLY"));
      } catch (error) {
        console.error;
      }
    }
  };

  return (
    <div key={formattedDate} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imgBox}>
          <div className={styles.comment__flexBox}>
            <img
              src={data.photoURL ? data.photoURL : PROFILE_DEFAULT_URL}
              alt="profile"
            />
            <div className={styles.comment__displayName}>
              {data.displayName}
            </div>
            <div className={styles.comment__createdAt}>{formattedDate}</div>
          </div>
        </div>
        <div className={styles.comment__comment}>{data.comment}</div>
      </div>
      <div className={styles.comment__submitDiv}>
        {data.uid === user?.uid && (
          <button
            type="button"
            className={styles.comment__deleteBtn}
            onClick={handleDeleteComment}
          >
            {translate("BUTTON_DELETE")}
          </button>
        )}
      </div>
    </div>
  );
}
