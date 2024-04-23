import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import MobileHeader from "components/MobileHeader";
import firebase from "firebase/compat/app";
import { CommentProps } from "components/comments/CommentBox";
import useTranslation from "hooks/useTranslation";

export interface PostProps {
  id: string;
  username: string;
  email: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: CommentProps[];
  hashTags?: string[];
  imageUrl?: string;
}

export interface UserProps {
  id: string;
}

type TabType = "all" | "following";

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { user } = useContext(AuthContext);
  const translate = useTranslation();

  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user.uid);
      onSnapshot(ref, (doc) => {
        setFollowingIds([]);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev) => (prev ? [...prev, user.id] : []))
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      const postsRef = collection(db, "posts");
      const postQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      if (followingIds.length > 0) {
        const followingQuery = query(
          postsRef,
          where("uid", "in", followingIds),
          orderBy("createdAt", "desc")
        );

        onSnapshot(followingQuery, (snapshot) => {
          const dataObj = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setFollowingPosts(dataObj as PostProps[]);
        });
      } else {
        setFollowingPosts([]);
      }
    }
  }, [followingIds, user]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

  return (
    <div className="home">
      <div className="home__top">
        <MobileHeader />
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            <span>{translate("TAB_ALL")}</span>
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            <span>{translate("TAB_FOLLOWING")}</span>
          </div>
        </div>
      </div>
      <PostForm />
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{translate("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => (
              <PostBox post={post} key={post?.id} />
            ))
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{translate("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
