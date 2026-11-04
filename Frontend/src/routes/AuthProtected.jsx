import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../context/AuthContextProvider";

function AuthProtected() {
  const { user } = useContext(MyStore);
  
  if (user) {
    return <Navigate to={"/main/products"} />;
  }
  return <Outlet />;  
}

export default AuthProtected;
