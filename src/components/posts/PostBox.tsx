import AuthContext from "context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { PostProps } from "pages/home/Home";
import { useContext } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const formattedDate = post.createdAt.toDate().toLocaleDateString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    const confirm = window.confirm("Delete post?");
    if (confirm) {
      const imageRef = ref(storage, post?.imageUrl);

      if (post?.imageUrl) {
        deleteObject(imageRef).catch((error) => console.log(error));
      }

      await deleteDoc(doc(db, "posts", post.id));
      toast("Your post was deleted");
      nav("/", { replace: true });
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <Link to={`/posts/${post?.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            <img
              src={
                post?.profileUrl ? post?.profileUrl : "/src/assets/profile.webp"
              }
              alt={`${post?.username}'s profile`}
              className="post__box-profile-img"
            />
            <div className="post__username">{post?.username}</div>
            <div className="post__createdAt">{formattedDate}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                src={post.imageUrl}
                alt="post image"
                className="post__image"
                width={"100%"}
                height={"auto"}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span key={index} className="post-form__hashtags-tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="post__box-footer">
        <div className="post__social-actions">
          <button
            type="button"
            title="Reply"
            aria-label="Reply"
            className="post__comments"
          >
            <FaRegComment />
            {post?.comments?.length || 0}
          </button>
          <button
            type="button"
            title="Like"
            aria-label="Like"
            className="post__likes"
          >
            <FaRegHeart />
            {post?.likeCount || 0}
          </button>
        </div>
        {user?.uid === post?.uid && (
          <div className="post__admin-actions">
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
            </button>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
