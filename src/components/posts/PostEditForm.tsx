import AuthContext from "context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { db, storage } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home/Home";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const nav = useNavigate();
  const translate = useTranslation();

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
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
    if (e.key === " " && target.value.trim() !== "") {
      if (tags?.includes(target.value?.trim())) {
        toast(translate("TOAST_ALREADY_HASHTAG"));
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file);

      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const { result } = e.currentTarget as FileReader;
        if (typeof result === "string") {
          setImageFile(result);
        } else {
          setImageFile(null);
          toast(translate("TOAST_FAILED_UPLOAD_IMAGE"));
        }
      };
    }
  };

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
      setImageFile(docSnap?.data()?.imageUrl);

      setTimeout(() => {
        handleInput();
      }, 0);
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    e.preventDefault();

    try {
      if (post) {
        if (post?.imageUrl) {
          const imageRef = ref(storage, post?.imageUrl);
          await deleteObject(imageRef).catch((error) => console.log(error));
        }

        let imageUrl = "";
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data.ref);
        }

        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content,
          hashTags: tags,
          imageUrl,
        });
      }
      nav(`/posts/${post?.id}`);
      toast(translate("TOAST_EDIT_POST"));
      setImageFile(null);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
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
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder={translate("POST_PLACEHOLDER")}
        value={content}
        ref={textareaRef}
        onInput={handleInput}
        onChange={onChange}
      />
      {imageFile && (
        <div className="post-form__attachment">
          <img
            src={imageFile}
            alt="attachment"
            width={"100%"}
            height={"auto"}
          />
          <button
            className="post-form__clear-btn"
            type="button"
            onClick={handleDeleteImage}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="post-form__hashtags-tag tag-remove"
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
          placeholder={translate("POST_HASHTAG")}
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
      <div className="post-form__submit-area">
        <div className="post-form__image-area">
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
        </div>
        <input
          type="submit"
          value={translate("BUTTON_EDIT")}
          className="post-form__submit-btn"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
