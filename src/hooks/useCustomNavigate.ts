import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, replace = false) => {
    navigate(path, { replace });
  };

  const goBack = () => {
    navigate(-1);
  };

  return { navigateTo, goBack };
};
