import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home/Home";
import { useContext } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const handleDelete = () => {};
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
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
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
