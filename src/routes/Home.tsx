import { auth } from "../firebase";
import useGoto from "../hooks/useGoto";

const Home = () => {
  const goto = useGoto();

  const logOut = () => {
    auth.signOut();
    goto("/");
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
};

export default Home;
