import { useNavigate } from "react-router-dom";

const useGoto = () => {
  const navigate = useNavigate();

  return (route: string) => {
    navigate(route);
  };
};

export default useGoto;
