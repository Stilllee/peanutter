import Home from "pages/home/Home";
import Notifications from "pages/notifications/Notifications";
import PostDetail from "pages/posts/PostDetail";
import PostEdit from "pages/posts/PostEdit";
import PostList from "pages/posts/PostList";
import PostNew from "pages/posts/PostNew";
import Profile from "pages/profile/Profile";
import ProfileEdit from "pages/profile/ProfileEdit";
import Search from "pages/search/Search";
import Login from "pages/users/Login";
import Signup from "pages/users/Signup";
import { Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/search" element={<Search />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/users/signup" element={<Signup />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
