import Layout from "components/Layout";
import Router from "components/Router";
import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
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
      <Router isAuthenticated={isAuthenticated} />
    </Layout>
  );
}

export default App;
