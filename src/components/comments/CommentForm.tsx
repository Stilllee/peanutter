import AuthContext from "context/AuthContext";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home/Home";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);
  const translate = useTranslation();

  const truncate = (str: string) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (post) {
      try {
        const postRef = doc(db, "posts", post.id);

        const commentObj = {
          comment,
          uid: user?.uid,
          displayName: user?.displayName,
          createdAt: Timestamp.now(),
          photoURL: user?.photoURL,
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });

        if (user?.uid !== post.uid) {
          await addDoc(collection(db, "notifications"), {
            createdAt: Timestamp.now(),
            uid: post.uid,
            isRead: false,
            url: `/posts/${post.id}`,
            content: {
              en: `A comment was written on the post "${truncate(
                post.content
              )}"`,
              ko: `게시물 "${truncate(post.content)}"에 답글이 작성되었습니다`,
            },
          });
        }

        toast(translate("TOAST_SEND_REPLY"));
        setComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="comment"
        id="comment"
        placeholder={translate("REPLY_PLACEHOLDER")}
        value={comment}
        ref={textareaRef}
        onInput={handleInput}
        onChange={onChange}
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value={translate("BUTTON_REPLY")}
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
