import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { checkTokenExpiration } from "../components/utils/ApiFunctions";
import { useAuth } from "../components/auth/AuthProvider";

const useCheckToken = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleLogout } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await checkTokenExpiration();
      } catch (error) {
        handleLogout();
        navigate("/");
      }
    };
    checkToken();
  }, [pathname]);
  return null;
};

export default useCheckToken;
