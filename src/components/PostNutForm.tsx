import styled from "styled-components";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Input } from "./auth-components";
import { useRef, useState } from "react";

const Form = styled.form`
  color: ${({ theme }) => theme.brown};
  width: 510px;
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  height: 52px;
  resize: none;
  overflow: hidden;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  padding: 12px 0;
  outline: none;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.lineGray};
  color: ${({ theme }) => theme.darkGray};
`;

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;

const AttachFileBtn = styled.label`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  &:hover {
    background-color: rgba(247, 198, 37, 0.2);
    border-radius: 50%;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled(Input)`
  &.upload {
    height: 100%;
    font-size: 15px;
    padding: 8px 16px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.yellow};
    border-color: ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.brown};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    &:hover {
      background-color: ${({ theme }) => theme.hoverYellow};
      border-color: ${({ theme }) => theme.hoverYellow};
    }
  }
`;

const PostNutForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [nut, setNut] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setHasText(textareaRef.current.value.length > 0);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNut(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <Form>
      <Textarea
        maxLength={140}
        onChange={onChange}
        value={nut}
        ref={textareaRef}
        onInput={handleInput}
        placeholder="무슨 일이 일어나고 있나요?"
      />
      <UploadBox>
        <AttachFileBtn title="사진 추가" aria-label="사진 추가" htmlFor="file">
          <HiOutlinePhotograph />
        </AttachFileBtn>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitBtn
          style={{ opacity: hasText ? 1 : 0.5 }}
          disabled={!hasText}
          className="upload"
          type="submit"
          value={isLoading ? "게시 중..." : "게시하기"}
        />
      </UploadBox>
    </Form>
  );
};

export default PostNutForm;
