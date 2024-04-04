import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { toast } from "react-toastify";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev?.filter((value) => value !== tag));
  };

  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value?.trim());
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === " " && target?.value.trim() !== "") {
      if (tags?.includes(target?.value.trim())) {
        toast("You already used this hashtag");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  const handleFileUpload = () => {};

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

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
        username: user?.displayName || "Anonymous",
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setTags([]);
      setHashTag("");
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

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        value={content}
        ref={textareaRef}
        onInput={handleInput}
        onChange={onChange}
      />
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="post-form__hashtags-tag"
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          type="text"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
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
