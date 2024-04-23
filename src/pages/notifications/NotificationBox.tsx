import { useNavigate } from "react-router-dom";
import { NotificationsProps } from "./Notifications";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import styles from "./NotificationBox.module.scss";

export default function NotificationBox({
  notification,
}: {
  notification: NotificationsProps;
}) {
  const nav = useNavigate();
  const lang = localStorage.getItem("language");

  const onClickNotification = async (url: string) => {
    const ref = doc(db, "notifications", notification.id);
    await updateDoc(ref, {
      isRead: true,
    });

    nav(url);
  };

  const formattedDate = notification.createdAt
    .toDate()
    .toLocaleDateString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={styles.notification}>
      <div onClick={() => onClickNotification(notification.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createdAt}>{formattedDate}</div>
          {notification.isRead === false && (
            <div className={styles.notification__unread} />
          )}
        </div>
        <div className={styles.notification__content}>
          {lang === "en" ? notification.content.en : notification.content.ko}
        </div>
      </div>
    </div>
  );
}
