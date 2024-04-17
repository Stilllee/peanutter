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

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function Profile() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      const postsRef = collection(db, "posts");
      const postQuery = query(
        postsRef,
        where("uid", "==", user.uid),
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
          <div className="home__tab home__tab--active">
            <span>My Nuts</span>
          </div>
          <div className="home__tab">
            <span>Likes</span>
          </div>
        </div>
      </div>
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post?.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">No posts yet</div>
          </div>
        )}
      </div>
    </div>
  );
}
