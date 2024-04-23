import Header from "components/Header";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home/Home";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function Search() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const translate = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (user) {
      const postRef = collection(db, "posts");
      const postQuery = query(
        postRef,
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );

      onSnapshot(postQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setPosts(dataObj as PostProps[]);
      });
    }
  }, [tagQuery, user]);

  return (
    <div className="search">
      <Header
        leftChild={
          <button
            type="button"
            aria-label={translate("HEADER_PROFILE")}
            title={translate("HEADER_PROFILE")}
            onClick={() => nav("/profile")}
          >
            <div className="menu-btn">
              <img
                src={user?.photoURL || PROFILE_DEFAULT_URL}
                alt="user's profile"
                className="header__profile-img"
              />
            </div>
          </button>
        }
        centerChild={
          <input
            type="text"
            placeholder={translate("SEARCH_PLACEHOLDER")}
            onChange={onChange}
            className="search__input"
          />
        }
      />
      <div className="post">
        {posts?.length > 0 ? (
          posts.map((post) => <PostBox post={post} key={post?.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">{translate("NO_POSTS")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
