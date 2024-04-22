import Header from "components/Header";
import AuthContext from "context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { db, storage } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDisplayName(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newImageUrl = user?.photoURL;

    if (imageUrl && imageUrl !== user?.photoURL) {
      const key = `${user?.uid}/${uuidv4()}`;
      const storageRef = ref(storage, key);
      const uploadTask = await uploadString(storageRef, imageUrl, "data_url");
      newImageUrl = await getDownloadURL(uploadTask.ref);

      if (
        user?.photoURL &&
        user.photoURL.startsWith("https://firebasestorage.googleapis.com")
      ) {
        const oldImageRef = ref(storage, user.photoURL);
        await deleteObject(oldImageRef).catch(console.error);
      }
    }

    if (user) {
      await updateProfile(user, {
        displayName,
        photoURL: newImageUrl,
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName,
        photoURL: newImageUrl,
      });
      nav("/profile", { replace: true });
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
          setImageUrl(result);
        }
      };
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }
    if (user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user?.displayName, user?.photoURL]);

  return (
    <div className="post">
      <Header
        leftChild={
          <button
            type="button"
            aria-label="Back"
            title="Back"
            onClick={() => nav(-1)}
          >
            <div className="menu-btn">
              <HiArrowLeft />
            </div>
          </button>
        }
        centerChild={"Edit profile"}
      />
      <form className="form profile-form" onSubmit={onSubmit}>
        <div className="post-form__submit-area">
          <div className="profile-form__submit-area">
            <img src={imageUrl || PROFILE_DEFAULT_URL} alt="" />
            <label
              htmlFor="file-input"
              title="Image"
              className="post-form__file"
            >
              <MdOutlineAddAPhoto className="post-form__file-icon" />
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
        </div>
        <div className="form__block">
          <input
            type="text"
            id="username"
            name="username"
            value={displayName}
            maxLength={10}
            required
            autoComplete="off"
            onChange={onChange}
          />
          <label htmlFor="username" className="placeholder label--focused">
            Username
          </label>
        </div>
        <button type="submit" className="form__btn-submit">
          Save
        </button>
      </form>
    </div>
  );
}
