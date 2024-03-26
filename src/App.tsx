import Layout from "components/Layout";
import Router from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
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
    <Layout isAuthenticated={isAuthenticated}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        pauseOnHover={false}
        limit={1}
        closeButton={false}
        theme="light"
      />
      {init ? (
        <Router isAuthenticated={isAuthenticated} />
      ) : (
        <div className="clip-loader">
          <ClipLoader color="#f9d142" />
        </div>
      )}
    </Layout>
  );
}

export default App;
