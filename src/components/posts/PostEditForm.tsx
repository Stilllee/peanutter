import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home/Home";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const nav = useNavigate();

  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content,
        });
      }
      nav(`/posts/${post?.id}`);
      toast("Your post was edited");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__text"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        value={content}
        onChange={onChange}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" title="Image" className="post-form__file">
          <HiOutlinePhotograph className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="image/*"
          aria-label="Image upload"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value={"Edit"} className="post-form__submit-btn" />
      </div>
    </form>
  );
}
