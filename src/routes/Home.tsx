import { auth } from "../firebase";
import { useModal } from "../hooks/useCustomModal";
import { useCustomNavigate } from "../hooks/useCustomNavigate";

const Home = () => {
  const { openModal } = useModal();
  const { navigateTo } = useCustomNavigate();

  const handleLogout = () => {
    openModal(null);
    auth.signOut();
    navigateTo("/", true);
  };
  return (
    <h1>
      <button onClick={handleLogout}>Log Out</button>
    </h1>
  );
};

export default Home;
