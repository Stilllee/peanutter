import AuthContext from "context/AuthContext";
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps, UserProps } from "pages/home/Home";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface FollowingProps {
  post: PostProps;
}

export default function FollowingBox({ post }: FollowingProps) {
  const [postFollowers, setPostFollowers] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const translate = useTranslation();

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post.uid }),
          },
          { merge: true }
        );

        const followerRef = doc(db, "follower", post.uid);
        await setDoc(
          followerRef,
          {
            users: arrayUnion({ id: user.uid }),
          },
          { merge: true }
        );

        await addDoc(collection(db, "notifications"), {
          createdAt: Timestamp.now(),
          uid: post.uid,
          isRead: false,
          url: "#",
          content: {
            en: `${user.displayName} started following you.`,
            ko: `${user.displayName}님이 팔로우를 시작했습니다.`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFollow = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post.uid }),
        });

        const followerRef = doc(db, "follower", post.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user.uid }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, "follower", post.uid);
      onSnapshot(ref, (doc) => {
        setPostFollowers([]);
        doc
          ?.data()
          ?.users.map((user: UserProps) =>
            setPostFollowers((prev) => (prev ? [...prev, user.id] : []))
          );
      });
    }
  }, [post.uid]);

  useEffect(() => {
    if (post.uid) getFollowers();
  }, [getFollowers, post.uid]);

  return (
    <>
      {user &&
        user?.uid !== post.uid &&
        (postFollowers.includes(user?.uid) ? (
          <button className="post__following-btn" onClick={onClickDeleteFollow}>
            {translate("BUTTON_FOLLOWING")}
          </button>
        ) : (
          <button className="post__follow-btn" onClick={onClickFollow}>
            {translate("BUTTON_FOLLOW")}
          </button>
        ))}
    </>
  );
}
