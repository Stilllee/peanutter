import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { toast } from "react-toastify";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileUpload = () => {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        username: user?.displayName,
        uid: user?.uid,
        email: user?.email,
      });
      setContent("");
      toast("Your post was sent");
    } catch (error) {
      console.log(error);
    } finally {
      if (textareaRef.current) {
        textareaRef.current.style.height = "52px";
      }
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
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__text"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        value={content}
        ref={textareaRef}
        onInput={handleInput}
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
        <input type="submit" value={"Post"} className="post-form__submit-btn" />
      </div>
    </form>
  );
}
