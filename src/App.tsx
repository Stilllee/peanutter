import { RecoilRoot } from "recoil";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Router from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

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

  return (
    <RecoilRoot>
      <Layout isAuthenticated={isAuthenticated}>
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
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
    </RecoilRoot>
  );
}

export default App;
