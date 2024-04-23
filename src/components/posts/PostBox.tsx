import FollowingBox from "components/following/FollowingBox";
import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home/Home";
import { useContext, useEffect, useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    photoURL: "",
  });
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const formattedDate = post?.createdAt?.toDate()?.toLocaleDateString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const translate = useTranslation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!post || !post.uid) return;

      const userRef = doc(db, "users", post.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserInfo({
          displayName: userData?.displayName,
          photoURL: userData?.photoURL,
        });
      }
    };
    fetchUserInfo();
  }, [post]);

  const toggleLike = async () => {
    const postRef = doc(db, "posts", post.id);

    if (user?.uid && post.likes?.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(translate("TOAST_DELETE_POST_ALERT"));
    if (confirm) {
      const imageRef = ref(storage, post?.imageUrl);

      if (post?.imageUrl) {
        deleteObject(imageRef).catch((error) => console.log(error));
      }

      await deleteDoc(doc(db, "posts", post.id));
      toast(translate("TOAST_DELETE_POST"));
      nav("/", { replace: true });
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <div className="post__box-profile">
        <div className="post__flex--between">
          <div className="post__flex">
            <img
              src={userInfo?.photoURL || PROFILE_DEFAULT_URL}
              alt={`${post?.username}'s profile`}
              className="post__box-profile-img"
            />
            <div className="post__username">{userInfo.displayName}</div>
            <div className="post__createdAt">{formattedDate}</div>
          </div>
          <FollowingBox post={post} />
        </div>
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                src={post.imageUrl}
                alt="post image"
                className="post__image"
                width={"100%"}
                height={"auto"}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.sort().map((tag, index) => (
              <span key={index} className="post-form__hashtags-tag">
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <div className="post__box-footer">
        <div className="post__social-actions">
          <button
            type="button"
            title="Reply"
            aria-label="Reply"
            className="post__comments"
          >
            <FaRegComment />
            {post?.comments?.length || 0}
          </button>
          <button
            type="button"
            title={translate("TAB_LIKE")}
            aria-label={translate("TAB_LIKE")}
            className="post__likes"
            onClick={toggleLike}
          >
            {user && post?.likes?.includes(user.uid) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
            {post?.likeCount || 0}
          </button>
        </div>
        {user?.uid === post?.uid && (
          <div className="post__admin-actions">
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>
                {translate("BUTTON_EDIT")}
              </Link>
            </button>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              {translate("BUTTON_DELETE")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
