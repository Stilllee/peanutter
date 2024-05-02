# PeaNutter V2

![PeaNutter](https://i.imgur.com/0dKHRco.png)

<br>

## 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [기술 스택](#기술-스택)
3. [주요 기능 및 특징](#주요-기능-및-특징)
   - [좋아요](#1-좋아요)
   - [팔로우](#2-팔로우)
   - [해시태그 및 검색](#3-해시태그-및-검색)
   - [알림](#4-알림)
   - [다국어 처리](#5-다국어-처리)
4. [페이지별 상세 기능](#페이지별-상세-기능)
5. [반응형 웹 디자인](#반응형-웹-디자인)
6. [설치 및 실행](#설치-및-실행)
7. [배포](#배포)
8. [폴더 구조](#폴더-구조)

<br>

## 프로젝트 정보

이 프로젝트는 과거에 개발한 소셜미디어 'PeaNutter'를 마이그레이션하고, 좋아요, 팔로우, 해시태그 및 검색, 다국어 처리 등의 새로운 기능을 추가한 프로젝트 입니다.

### 프로젝트 개요

- 주제 : PeaNutter의 마이그레이션 및 기능 확장
- 작업 기간 : 2024.03.23 ~ 2024.04.29

<br>

## 기술 스택

<div>
<img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
<img alt="Sass" src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white" />
<img alt="Recoil" src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white" />
<img alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white" />
</div>

<br>

## 주요 기능 및 특징

### 1. 좋아요

#### 1-1 좋아요 토글 기능

하트 아이콘을 클릭하면, 현재 사용자의 ID가 해당 게시물의 'likes'배열에 추가되며, 이미 좋아요를 누른 게시물을 다시 클릭하면, 해당 사용자의 ID가 'likes'배열에서 제거됩니다.

이 과정은 Firestore의 `arrayUnion`과 `arrayRemove` 메서드를 사용하여 구현하였으며, 실시간 업데이트를 통해 좋아요 수를 즉시 반영합니다.

<details>

  <summary>코드</summary>

```tsx
// components/posts/PostBox.tsx

const toggleLike = async () => {
  const postRef = doc(db, "posts", post.id); // 해당 게시물의 문서 참조

  if (user?.uid && post.likes?.includes(user.uid)) {
    // 현재 사용자가 이미 좋아요를 누른 경우
    await updateDoc(postRef, {
      likes: arrayRemove(user?.uid), // likes 배열에서 사용자 ID 제거
      likeCount: post?.likeCount ? post?.likeCount - 1 : 0, // 좋아요 수 감소
    });
  } else {
    // 현재 사용자가 좋아요를 누르지 않은 경우
    await updateDoc(postRef, {
      likes: arrayUnion(user?.uid), // likes 배열에 사용자 ID 추가
      likeCount: post?.likeCount ? post?.likeCount + 1 : 1, // 좋아요 수 증가
    });
  }
};
```

</details>

#### 1-2 좋아요한 게시물 목록

사용자는 '좋아요'를 누른 게시물만 모아 별도의 탭에서 확인할 수 있습니다.

<details>

  <summary>코드</summary>

```tsx
useEffect(() => {
  if (user) {
    const postsRef = collection(db, "posts"); // 게시물 컬렉션 참조

    // 좋아요한 게시물만 조회하는 쿼리 생성
    const likePostQuery = query(
      postsRef,
      where("likes", "array-contains", user.uid),
      orderBy("createdAt", "desc")
    );

    // 쿼리 결과를 실시간으로 업데이트
    onSnapshot(likePostQuery, (snapshot) => {
      const dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLikePosts(dataObj as PostProps[]); // 좋아요한 게시물 목록 업데이트
    });
  }
}, [user]);
```

</details>

#### 1-3 사용자 인터페이스

![좋아요](https://i.imgur.com/XOFkUWO.gif)

![마음에 들어요](https://i.imgur.com/MZzsyUD.gif)

<details>

  <summary>코드</summary>

```tsx
// components/posts/PostBox.tsx

return (
  <button onClick={toggleLike}>
    // 좋아요 클릭 여부에 따라 아이콘 변경
    {user && post?.likes?.includes(user.uid) ? <FaHeart /> : <FaRegHeart />}
    {post?.likeCount || 0} // 좋아요 수 표시
  </button>
);
```

```tsx
<>
  {activeTab === "like" && (
    <div>
      // 좋아요한 게시물 목록 표시
      {likePosts?.length > 0 ? (
        likePosts?.map((post) => <PostBox post={post} key={post?.id} />)
      ) : (
        <div>
          <div>{translate("NO_POSTS")}</div>
        </div>
      )}
    </div>
  )}
</>
```

</details>

<br>

### 2. 팔로우

사용자는 다른 사용자를 팔로우할 수 있고, 팔로우한 사용자의 게시물을 '팔로잉' 탭에서 볼 수 있습니다. 또한, 언제든지 팔로우를 취소할 수 있습니다.

#### 2-1 팔로우 상태 관리

`FollowingBox` 컴포넌트에서는 사용자가 현재 게시물의 작성자를 팔로우하고 있는지 여부를 확인하고, 팔로우 또는 언팔로우 할 수 있는 기능을 제공합니다.

<details>

  <summary>코드</summary>

```tsx
// components/following/FollowingBox.tsx

const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
  if (user?.uid) {
    const followingRef = doc(db, "following", user.uid); // 현재 사용자의 팔로잉 목록 문서 참조
    // 현재 사용자의 팔로잉 목록에 게시물 작성자 ID 추가
    await setDoc(
      followingRef,
      {
        users: arrayUnion({ id: post.uid }),
      },
      { merge: true }
    );

    const followerRef = doc(db, "follower", post.uid); // 게시물 작성자의 팔로워 목록 문서 참조
    // 게시물 작성자의 팔로워 목록에 현재 사용자의 ID 추가
    await setDoc(
      followerRef,
      {
        users: arrayUnion({ id: user.uid }),
      },
      { merge: true }
    );
    // ...
  }
};

const onClickDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
  if (user?.uid) {
    const followingRef = doc(db, "following", user.uid);
    // 현재 사용자의 팔로잉 목록에서 게시물 작성자 ID 제거
    await updateDoc(followingRef, {
      users: arrayRemove({ id: post.uid }),
    });

    const followerRef = doc(db, "follower", post.uid);
    // 게시물 작성자의 팔로워 목록에서 현재 사용자의 ID 제거
    await updateDoc(followerRef, {
      users: arrayRemove({ id: user.uid }),
    });
  }
};
```

</details>

#### 2-2 팔로우 목록 갱신

팔로워 목록은 실시간으로 업데이트되며, 사용자가 팔로우 또는 언팔로우 액션을 취할 때 데이터베이스의 변경 사항을 즉각 반영합니다. 이는 Firestore의 실시간 리스너인 `onSnapshot`을 사용하여 구현하였습니다.

<details>

  <summary>코드</summary>

```tsx
// components/following/FollowingBox.tsx

const getFollowers = useCallback(async () => {
  if (post.uid) {
    const ref = doc(db, "follower", post.uid); // 게시물 작성자의 팔로워 목록 문서 참조
    // 문서 스냅샷을 통해 실시간으로 변경 사항 반영
    onSnapshot(ref, (doc) => {
      setPostFollowers([]); // 팔로워 목록 초기화
      doc?.data()?.users.map(
        (
          user: UserProps // 데이터에서 사용자 목록 추출
        ) => setPostFollowers((prev) => (prev ? [...prev, user.id] : [])) // 팔로워 ID로 목록 업데이트
      );
    });
  }
}, [post.uid]);
```

</details>

#### 2-3 팔로우 게시물 필터링

'팔로잉'탭에서는 사용자가 팔로우하는 계정의 게시물만 조회하여 표시하며, 이는 `followingIds`배열을 사용하여 Firestore 쿼리를 필터링하여 구현하였습니다.

<details>

  <summary>코드</summary>

##### 사용자 팔로우 목록 조회

```tsx
// pages/home/Home.tsx

const [followingIds, setFollowingIds] = useState<string[]>([""]);

const getFollowingIds = useCallback(async () => {
  if (user?.uid) {
    const ref = doc(db, "following", user.uid); // 현재 사용자의 팔로잉 목록 문서 참조

    // 문서 스냅샷을 통해 실시간으로 변경 사항 반영
    onSnapshot(ref, (doc) => {
      setFollowingIds([]); // 팔로잉 ID 목록 초기화
      doc?.data()?.users?.map(
        (user: UserProps) =>
          setFollowingIds((prev) => (prev ? [...prev, user.id] : [])) // 팔로잉 ID 목록 업데이트
      );
    });
  }
}, [user?.uid]); // 현재 사용자 ID가 변경될 때마다 호출
```

##### 팔로우한 사용자의 게시물 필터링

```tsx
// pages/home/Home.tsx

const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);

useEffect(() => {
  if (user) {
    const postsRef = collection(db, "posts"); // 게시물 컬렉션 참조
    //...
    if (followingIds.length > 0) {
      // Firestore 쿼리를 생성하여 팔로우하는 사용자의 게시물만 조회
      const followingQuery = query(
        postsRef,
        where("uid", "in", followingIds), // uid 필드가 followingIds 배열에 포함된 문서만 선택
        orderBy("createdAt", "desc")
      );

      // 쿼리 결과를 실시간으로 업데이트
      onSnapshot(followingQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(), // 문서 데이터 추출
          id: doc.id, // 문서 ID 포함
        }));
        setFollowingPosts(dataObj as PostProps[]); // 팔로잉 게시물 목록 업데이트
      });
    } else {
      setFollowingPosts([]); // 팔로잉하는 계정이 없는 경우 빈 배열 반환
    }
  }
}, [followingIds, user]);
```

</details>

#### 2-4 사용자 인터페이스

![팔로우](https://i.imgur.com/LYUbrya.gif)

<details>

  <summary>코드</summary>

```tsx
// components/following/FollowingBox.tsx

return (
  <>
    {user &&
      user?.uid !== post.uid && // 현재 사용자가 게시물 작성자가 아닌 경우에만 팔로우 버튼 표시
      (postFollowers.includes(user?.uid) ? ( // 팔로워 목록에 현재 사용자 ID가 있는 경우
        <button onClick={onClickDeleteFollow}>
          {translate("BUTTON_UNFOLLOW")} // 언팔로우 버튼
        </button>
      ) : (
        <button onClick={onClickFollow}>
          {translate("BUTTON_FOLLOW")} // 팔로우 버튼
        </button>
      ))}
  </>
);
```

```tsx
// pages/home/Home.tsx

{
  activeTab === "following" && ( // 팔로잉 탭이 활성화된 경우
    <div>
      // 팔로잉 계정의 게시물만 표시
      {followingPosts?.length > 0 ? (
        // 팔로잉 게시물이 있는 경우 목록 표시
        followingPosts?.map((post) => <PostBox post={post} key={post?.id} />)
      ) : (
        <div>
          <div>{translate("NO_POSTS")}</div>
        </div>
      )}
    </div>
  );
}
```

</details>

<br>

### 3. 해시태그 및 검색

사용자는 게시물을 작성할 때 해시태그를 추가할 수 있으며, 검색 페이지에서 해시태그를 검색하여 관련 게시물을 조회할 수 있습니다.

#### 3-1 해시태그 추가 및 제거

스페이스바를 입력하면 해시태그가 추가되며, 중복된 해시태그는 추가되지 않습니다. 해시태그를 클릭하면 해당 해시태그는 삭제됩니다.

<details>

  <summary>코드</summary>

```tsx
// components/posts/PostForm.tsx

const [hashTag, setHashTag] = useState<string>("");
const [tags, setTags] = useState<string[]>([]);

const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;

  // 공백 입력 시 해시태그 추가
  if (e.key === " " && target?.value.trim() !== "") {
    if (tags?.includes(target?.value.trim())) {
      // 중복 해시태그 방지
      toast(translate("TOAST_ALREADY_HASHTAG"));
    } else {
      // 중복이 아닌 경우 해시태그 추가
      setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
      setHashTag("");
    }
  }
};

const removeTag = (tag: string) => {
  setTags((prev) => prev?.filter((value) => value !== tag));
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // ...
  // 게시글 작성 로직
  await addDoc(collection(db, "posts"), {
    content,
    createdAt: Timestamp.now(),
    username: user?.displayName || "Anonymous",
    uid: user?.uid,
    email: user?.email,
    hashTags: tags, // 해시태그 배열 추가
    imageUrl,
  });
  // ...
};
```

</details>

#### 3-2 게시물 검색

검색 페이지에서는 사용자가 입력한 해시태그를 포함하는 게시글만 조회하여 표시합니다.

<details>

  <summary>코드</summary>

```tsx
// pages/search/Search.tsx

const [tagQuery, setTagQuery] = useState<string>("");

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTagQuery(e.target.value.trim()); // 검색 쿼리 업데이트
};

useEffect(() => {
  if (user) {
    const postRef = collection(db, "posts"); // 게시물 컬렉션 참조
    const postQuery = query(
      postRef,
      where("hashTags", "array-contains-any", [tagQuery]), // 해시태그 배열에 검색 쿼리가 포함된 문서만 선택
      orderBy("createdAt", "desc")
    );

    // 쿼리 결과를 실시간으로 업데이트
    onSnapshot(postQuery, (snapshot) => {
      const dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setPosts(dataObj as PostProps[]); // 검색된 게시물 목록 업데이트
    });
  }
}, [tagQuery, user]);
```

</details>

#### 3-3 사용자 인터페이스

![해시태그 및 검색](https://i.imgur.com/pLWml75.gif)

<details>

  <summary>코드</summary>

```tsx
// components/search/Search.tsx

return (
  <>
    <div>
      // 해시태그로 검색된 게시물 목록 표시
      {posts?.length > 0 ? (
        posts.map((post) => <PostBox post={post} key={post?.id} />)
      ) : (
        <div>
          <div>{translate("NO_POSTS")}</div>
        </div>
      )}
    </div>
  </>
);
```

</details>

<br>

### 4. 알림

알림 페이지에서는 자신의 게시물에 대한 댓글, 팔로우 알림을 확인할 수 있습니다.

#### 4-1 알림 시스템 구현

`Notifications`컴포넌트는 사용자의 알림 목록을 조회하고, 실시간으로 업데이트 합니다.

<details>

  <summary>코드</summary>

```tsx
// pages/notifications/Notifications.tsx

const [notifications, setNotifications] = useState<NotificationsProps[]>([]);

useEffect(() => {
  if (user) {
    const ref = collection(db, "notifications"); // 알림 컬렉션 참조
    // 사용자 UID에 따른 알림을 최신순으로 정렬하는 쿼리 생성
    const notificationQuery = query(
      ref,
      where("uid", "==", user.uid), // 현재 사용자의 UID와 일치하는 알림만 조회
      orderBy("createdAt", "desc")
    );

    // 쿼리 결과에 대한 실시간 리스너 설정
    onSnapshot(notificationQuery, (snapshot) => {
      const dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setNotifications(dataObj as NotificationsProps[]); // 상태 업데이트
    });
  }
}, [user]);
```

</details>

#### 4-2 알림 상호작용

사용자가 알림을 클릭하면 알림은 '읽음'상태로 표시되며, 댓글 알림의 경우 해당 게시물로 이동합니다.

<details>

  <summary>코드</summary>

```tsx
// pages/notifications/NotificationBox.tsx

const nav = useNavigate();

const onClickNotification = async (url: string) => {
  const ref = doc(db, "notifications", notification.id); // 클릭된 알림 문서 참조
  await updateDoc(ref, {
    isRead: true, // 알림 상태를 '읽음'으로 변경
  });

  nav(url); // 제공된 URL로 라우팅
};
```

</details>

#### 4-3 사용자 인터페이스

![알림](https://i.imgur.com/Mvp382b.gif)

<details>

  <summary>코드</summary>

```tsx
// pages/notifications/Notifications.tsx

return (
  <>
    <div className="post">
      // 알림 목록 표시
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
  </>
);
```

```tsx
// pages/notifications/NotificationBox.tsx

return (
  <>
    <div onClick={() => onClickNotification(notification.url)}>
      <div>
        <div>{formattedDate}</div>
        {notification.isRead === false && <div />} // 읽지 않은 알림 표시
      </div>
      <div>
        // 설정된 언어에 따라 알림 내용 표시
        {lang === "en" ? notification.content.en : notification.content.ko}
      </div>
    </div>
  </>
);
```

</details>

<br>

### 5. 다국어 처리

한국어와 영어를 지원하여 사용자가 두 언어로 서비스를 이용할 수 있도록 개선하였습니다.

#### 5-1 기능 구현

##### 텍스트 정의

`TRANSLATIONS` 객체에 각 UI 요소에 대한 한국어와 영어 텍스트를 정의했습니다.

<details>

  <summary>코드</summary>

```tsx
// constants/language.ts

const TRANSLATIONS = {
  // ...
  TAB_MY: {
    ko: "내 게시물",
    en: "My Nuts",
  },
  TAB_LIKE: {
    ko: "마음에 들어요",
    en: "Likes",
  },
  //...
};
```

</details>

##### 언어 상태 관리

Recoil을 활용하여 애플리케이션의 언어 상태를 전역적으로 관리했습니다. 사용자가 언어를 변경할 때마다 상태가 업데이트되어 앱 전체에 반영됩니다.

<details>

  <summary>코드</summary>

```tsx
// atom/index.tsx

import { atom } from "recoil";

export type LanguageType = "en" | "ko";

export const languageState = atom<LanguageType>({
  key: "language", // 상태의 고유 키
  default: (localStorage.getItem("language") as LanguageType) || "ko", // 기본 언어 설정
});
```

</details>

##### 언어 변경 기능

커스텀 훅 `useTranslation`을 사용하여 컴포넌트에서 현재 언어에 맞는 텍스트를 조회할 수 있습니다. 이 훅은 `languageState`를 참조하여 필요한 텍스트를 반환합니다.

<details>

  <summary>코드</summary>

```tsx
// hooks/useTranslation.tsx

import { useRecoilValue } from "recoil";
import { languageState } from "atom/index";
import TRANSLATIONS from "constants/language";

export default function useTranslation() {
  const lang = useRecoilValue(languageState); // 현재 언어 상태

  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][lang]; // 요청된 키에 해당하는 현재 언어의 텍스트 반환
  };
}
```

</details>

#### 5-2 사용자 인터페이스

`Profile` 컴포넌트에서 다국어 처리 기능을 실제로 적용하는 방법입니다. 사용자가 언어를 변경하면 페이지 내의 UI 텍스트가 즉시 업데이트됩니다.

![다국어 처리](https://i.imgur.com/H1XcXD8.gif)

<details>

  <summary>코드</summary>

```tsx
// pages/profile/Profile.tsx
import { languageState } from "atom/index";
import useTranslation from "hooks/useTranslation";

export default function Profile() {
  const [language, setLanguage] = useRecoilState(languageState);
  const translate = useTranslation();

  const onClickLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
    localStorage.setItem("language", language === "en" ? "ko" : "en");
  };

  return (
    // ...
    <button onClick={onClickLanguage}>
      {language === "en" ? "English" : "한국어"}
    </button>
    // ...
      <span>{translate("TAB_MY")}</span>
      <span>{translate("TAB_LIKE")}</span>
    // ...
  );
}
```

</details>

<br>

## 페이지별 상세 기능

<br>

## 반응형 웹 디자인

<br>

## 설치 및 실행

```
npm install
npm run dev
```

<br>

## 배포

<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />

[PeaNutter](https://peanutter.vercel.app/)

<br>

## 폴더 구조

```
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── profile.webp
├── src
│   ├── App.tsx
│   ├── _utils.scss     # 유틸리티 스타일
│   ├── assets
│   │   └── logo.svg
│   ├── atom            # Recoil atom 디렉토리
│   │   └── index.tsx
│   ├── components      # 컴포넌트 디렉토리
│   │   ├── Header.tsx        # 헤더 컴포넌트
│   │   ├── Layout.tsx        # 레이아웃 컴포넌트
│   │   ├── Loader.tsx        # 로딩 컴포넌트
│   │   ├── Menu.tsx          # 메뉴 컴포넌트
│   │   ├── MobileHeader.tsx  # 모바일 헤더 컴포넌트
│   │   ├── Router.tsx        # 라우터 컴포넌트
│   │   ├── comments          # 댓글 관련 컴포넌트
│   │   │   ├── CommentBox.module.scss
│   │   │   ├── CommentBox.tsx
│   │   │   └── CommentForm.tsx
│   │   ├── following         # 팔로잉 관련 컴포넌트
│   │   │   └── FollowingBox.tsx
│   │   ├── landing           # 랜딩 페이지 관련 컴포넌트
│   │   │   ├── LocalSign.tsx
│   │   │   └── SocialLogin.tsx
│   │   ├── posts             # 게시물 관련 컴포넌트
│   │   │   ├── PostBox.tsx
│   │   │   ├── PostEditForm.tsx
│   │   │   └── PostForm.tsx
│   │   └── users             # 계정 관련 컴포넌트
│   │       ├── LoginForm.tsx
│   │       ├── ResetPasswordForm.tsx
│   │       └── SignupForm.tsx
│   ├── constants
│   │   ├── defaultProfileImage.ts
│   │   └── language.ts
│   ├── context
│   │   └── AuthContext.tsx
│   ├── firebaseApp.ts
│   ├── hooks
│   │   └── useTranslation.tsx
│   ├── index.scss
│   ├── main.tsx
│   ├── pages           # 페이지별 컴포넌트
│   │   ├── home              # 메인 페이지
│   │   │   └── Home.tsx
│   │   ├── landing           # 랜딩 페이지
│   │   │   └── Landing.tsx
│   │   ├── notifications     # 알림 페이지
│   │   │   ├── NotificationBox.module.scss
│   │   │   ├── NotificationBox.tsx
│   │   │   └── Notifications.tsx
│   │   ├── posts             # 게시물 페이지
│   │   │   ├── PostDetail.tsx
│   │   │   ├── PostEdit.tsx
│   │   │   ├── PostList.tsx
│   │   │   └── PostNew.tsx
│   │   ├── profile           # 프로필 페이지
│   │   │   ├── Profile.tsx
│   │   │   └── ProfileEdit.tsx
│   │   ├── search            # 검색 페이지
│   │   │   └── Search.tsx
│   │   └── users             # 계정 관련 페이지
│   │       ├── Login.tsx
│   │       ├── ResetPassword.tsx
│   │       └── Signup.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```
