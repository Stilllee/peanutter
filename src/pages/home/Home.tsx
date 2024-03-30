import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import MobileHeader from "components/MobileHeader";

export interface PostProps {
  id: string;
  username: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

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
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <MobileHeader />
        <div className="home__tabs">
          <div className="home__tab home__tab--active">
            <span>For you</span>
          </div>
          <div className="home__tab">
            <span>Following</span>
          </div>
        </div>
      </div>
      <PostForm />
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
