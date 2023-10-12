import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


function ProtectedRoute({ requiredPermission, children }) {
  const { userData } = useContext(AuthContext);

  if (!(userData.permission === requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  
  return children ? children : <Outlet />;
  
}

export default ProtectedRoute;

