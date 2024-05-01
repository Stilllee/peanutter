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
import { useRecoilState } from "recoil";
import { languageState } from "atom/index";
import useTranslation from "hooks/useTranslation";
import PROFILE_DEFAULT_URL from "constants/defaultProfileImage";

type TabType = "my" | "like";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const [language, setLanguage] = useRecoilState(languageState);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const translate = useTranslation();

  const onClickLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
    localStorage.setItem("language", language === "en" ? "ko" : "en");
  };

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
              aria-label={translate("HEADER_BACK")}
              title={translate("HEADER_BACK")}
              onClick={() => nav(-1)}
            >
              <div className="menu-btn">
                <HiArrowLeft />
              </div>
            </button>
          }
          centerChild={translate("HEADER_PROFILE")}
          rightChild={
            <button
              className="lang-btn"
              type="button"
              aria-label="language"
              title="language"
              onClick={onClickLanguage}
            >
              {language === "en" ? "English" : "한국어"}
            </button>
          }
        />
      </div>
      <div className="profile">
        <div className="profile__box">
          <img
            src={user?.photoURL || PROFILE_DEFAULT_URL}
            alt={`${user?.displayName}'s profile`}
            className="profile__image"
          />
          <button className="profile__btn" onClick={() => nav("/profile/edit")}>
            {translate("BUTTON_EDIT_PROFILE")}
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
          <span>{translate("TAB_MY")}</span>
        </div>
        <div
          className={`home__tab ${activeTab === "like" && "home__tab--active"}`}
          onClick={() => setActiveTab("like")}
        >
          <span>{translate("TAB_LIKE")}</span>
        </div>
      </div>
      {activeTab === "my" && (
        <div className="post">
          {myPosts?.length > 0 ? (
            myPosts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{translate("NO_POSTS")}</div>
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
              <div className="post__text">{translate("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
