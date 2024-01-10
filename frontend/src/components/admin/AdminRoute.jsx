import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAdminRoute } from "../utils/ApiFunctions";
import { HTTP_401_UNAUTHORIZED } from "../constants/httpStatusCodes";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminRoute = async () => {
      try {
        const ok = await getAdminRoute();

        setOk(ok);
        setIsLoading(false);
      } catch (error) {
        if (error?.response?.status === HTTP_401_UNAUTHORIZED) {
          navigate("/unauthorized");
        }
        console.log(error);
      }
    };

    fetchAdminRoute();
  }, []);

  return children;
};

export default AdminRoute;
