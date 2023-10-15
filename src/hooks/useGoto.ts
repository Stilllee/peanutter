import { useNavigate } from "react-router-dom";

type Goto = (route: string | -1) => void;

const useGoto = (): Goto => {
  const navigate = useNavigate();

  return (route) => {
    if (typeof route === "string") {
      navigate(route);
    } else if (route === -1) {
      navigate(-1);
    }
  };
};

export default useGoto;
