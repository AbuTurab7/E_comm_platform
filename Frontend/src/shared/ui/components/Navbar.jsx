import { House } from "lucide-react";
import { NavLink } from "react-router";
import { useLogoutUser } from "../../../features/auth/hooks/useAuth";

function Navbar() {
  const {user , handleLogout } = useLogoutUser();
  
  return (
    <div className="flex justify-between px-5 py-4">
      <NavLink
      to={"/main/products"}
        className="shadow shadow-gray-600 p-1 rounded-lg cursor-pointer"
      >
        <House />
      </NavLink>
      <div className="flex justify-between items-center gap-5">
       {user && <p>{user.name}</p>} 
        {user ? (
          <button 
          onClick={handleLogout}
          className="shadow shadow-gray-600 px-2 py-1 rounded-lg cursor-pointer">
            Logout
          </button>
        ) : (
          <NavLink
          to={"/auth/login"}
           className="shadow shadow-gray-600 px-2 py-1 rounded-lg cursor-pointer">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
