import Loader from "components/Loader";
import PostBox from "components/posts/PostBox";
import { doc, getDoc } from "firebase/firestore";
import { PostProps } from "pages/home/Home";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "firebaseApp";
import Header from "components/Header";
import { HiArrowLeft } from "react-icons/hi";

export default function PostDetail() {
  const params = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

  return (
    <div className="post">
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
        centerChild={"Post"}
      />
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
