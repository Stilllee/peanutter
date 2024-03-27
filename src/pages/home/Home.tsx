import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import Header from "components/Header";

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

const posts: PostProps[] = [
  {
    id: "1",
    username: "test1",
    email: "test@email.com",
    content: "1번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
  {
    id: "2",
    username: "test2",
    email: "test@email.com",
    content: "2번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
  {
    id: "3",
    username: "test3",
    email: "test@email.com",
    content: "3번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
  {
    id: "4",
    username: "test4",
    email: "test@email.com",
    content: "4번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
  {
    id: "5",
    username: "test5",
    email: "test@email.com",
    content: "5번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
  {
    id: "6",
    username: "test6",
    email: "test@email.com",
    content: "6번 내용입니다.",
    createdAt: "2024-03-23",
    uid: "123456",
  },
];

export default function Home() {
  return (
    <div className="home">
      <div className="home__top">
        <Header />
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
        {posts?.map((post) => (
          <PostBox post={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
}
