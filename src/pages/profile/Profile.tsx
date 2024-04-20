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
import { useContext, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type TabType = "my" | "like";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      const postsRef = collection(db, "posts");
      const myPostQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const likePostQuery = query(
        postsRef,
        where("likes", "array-contains", user.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(myPostQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMyPosts(dataObj as PostProps[]);
      });
      onSnapshot(likePostQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLikePosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
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
          centerChild={"Profile"}
        />
        <div className="profile">
          <div className="profile__box">
            <img
              src={user?.photoURL || PROFILE_DEFAULT_URL}
              alt={`${user?.displayName}'s profile`}
              className="profile__image"
            />
            <button
              className="profile__btn"
              onClick={() => nav("/profile/edit")}
            >
              Edit profile
            </button>
          </div>
          <div className="profile__text">
            <div className="profile__name">{user?.displayName}</div>
            <div className="profile__email">{user?.email}</div>
          </div>
        </div>
        <div className="home__tabs">
          <div
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setActiveTab("my")}
          >
            <span>My Nuts</span>
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("like")}
          >
            <span>Likes</span>
          </div>
        </div>
      </div>
      {activeTab === "my" && (
        <div className="post">
          {myPosts?.length > 0 ? (
            myPosts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">No posts yet</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "like" && (
        <div className="post">
          {likePosts?.length > 0 ? (
            likePosts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">No posts yet</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
