import { RecoilRoot } from "recoil";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Router from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <RecoilRoot>
      <Layout isAuthenticated={isAuthenticated}>
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover={false}
        limit={1}
        closeButton={false}
        closeOnClick={true}
        theme="light"
      />
    </RecoilRoot>
  );
}

export default App;
