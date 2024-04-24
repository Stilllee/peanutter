import Header from "components/Header";
import PostEditForm from "components/posts/PostEditForm";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function PostEdit() {
  const nav = useNavigate();
  return (
    <div>
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
        centerChild={"Edit"}
      />
      <PostEditForm />
    </div>
  );
}
