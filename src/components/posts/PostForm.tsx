import { HiOutlinePhotograph } from "react-icons/hi";

export default function PostForm() {
  const handleFileUpload = () => {};
  return (
    <form className="post-form">
      <textarea
        className="post-form__text"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" title="Image" className="post-form__file">
          <HiOutlinePhotograph className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="image/*"
          aria-label="Image upload"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value={"Post"} className="post-form__submit-btn" />
      </div>
    </form>
  );
}
