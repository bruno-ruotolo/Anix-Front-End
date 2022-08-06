import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/" />;
}
