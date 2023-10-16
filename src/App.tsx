import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import { createGlobalStyle, styled, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./routes/LandingPage";
import { RecoilRoot } from "recoil";

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
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </Wrapper>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
