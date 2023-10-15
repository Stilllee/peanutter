import { auth } from "../firebase";
import { useCustomNavigate } from "../hooks/useCustomNavigate";

const Home = () => {
  const { navigateTo } = useCustomNavigate();

  const logOut = () => {
    auth.signOut();
    navigateTo("/", true);
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
};

export default Home;
