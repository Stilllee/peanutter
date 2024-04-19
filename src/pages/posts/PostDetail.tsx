import Loader from "components/Loader";
import PostBox from "components/posts/PostBox";
import { doc, onSnapshot } from "firebase/firestore";
import { PostProps } from "pages/home/Home";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "firebaseApp";
import Header from "components/Header";
import { HiArrowLeft } from "react-icons/hi";
import CommentForm from "components/comments/CommentForm";
import CommentBox, { CommentProps } from "components/comments/CommentBox";

export default function PostDetail() {
  const params = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc?.data() as PostProps), id: doc?.id });
      });
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
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post.comments
            ?.slice(0)
            .reverse()
            .map((data: CommentProps, index: number) => (
              <CommentBox key={index} data={data} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
