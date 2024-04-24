import Header from "components/Header";
import AuthContext from "context/AuthContext";
import firebase from "firebase/compat/app";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBox from "./NotificationBox";
import useTranslation from "hooks/useTranslation";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export interface NotificationsProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: {
    en: string;
    ko: string;
  };
  createdAt: firebase.firestore.Timestamp;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const translate = useTranslation();

  useEffect(() => {
    if (user) {
      const ref = collection(db, "notifications");
      const notificationQuery = query(
        ref,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(notificationQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setNotifications(dataObj as NotificationsProps[]);
      });
    }
  }, [user]);

  return (
    <div className="notifications">
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
        centerChild={translate("MENU_NOTIFICATION")}
      />
      <div className="post">
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <NotificationBox notification={noti} key={noti.id} />
          ))
        ) : (
          <div className="post__no-posts">
            <div className="post__text">{translate("NO_NOTIFICATIONS")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
