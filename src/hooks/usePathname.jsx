import { useLocation } from "react-router-dom";

const usePathname = () => {
  const location = useLocation();
  return location.pathname.split("/");
};

export default usePathname;
