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
import { PostProps } from "pages/home/Home";
import React, { useContext, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

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
            aria-label="Back"
            title="Back"
            onClick={() => nav("/")}
          >
            <div className="menu-btn">
              <HiArrowLeft />
            </div>
          </button>
        }
        centerChild={
          <input
            type="text"
            placeholder="Search by tag"
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
            <div className="post__text">No posts yet</div>
          </div>
        )}
      </div>
    </div>
  );
}
