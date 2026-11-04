import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../context/authContext";

function AuthProtected() {
  const { user } = useContext(MyStore);
  
  if (user) {
    return <Navigate to={"/main/products"} />;
  }
  return <Outlet />;  
}

export default AuthProtected;
