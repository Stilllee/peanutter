import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import LandingPage from "./routes/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const theme = {
  yellow: "#f9d142",
  brown: "#292826",
  lightGray: "#f7f7f7",
  lineGray: "#cfd9de",
  darkGray: "#2e363e",
  hoverYellow: "#f7c625",
};

const GlobalStyle = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: white;
  color: black;
  font-family:
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
}
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const App = () => {
  const [isLoading, setLoading] = useState(true);

  // 앱이 로드될 때 Firebase의 인증 상태가 준비됐는지 확인하는 함수
  const init = async () => {
    await auth.authStateReady(); // Firebase의 인증 시스템이 앱에서 사용할 준비가 완료되면
    setLoading(false); // 로딩 상태를 false로 변경
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
