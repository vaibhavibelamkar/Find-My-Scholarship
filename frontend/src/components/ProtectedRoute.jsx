import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";


const getAuthData = () => {
  // Parse cookies into an object
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const token = cookies.token || null;
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return {
    token,
    role,
  };
};

  // ProtectedRoute with role-based access
  const ProtectedRoute = ({ element, allowedRole }) => {
    const { token, role } = getAuthData();
    console.log("Tokennnn:"+token)

  console.log("User Role:", role); // Debugging

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    alert("Access Denied! Required: " + allowedRole + ", Found: " + role);
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
