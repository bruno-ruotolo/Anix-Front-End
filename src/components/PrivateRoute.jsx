import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth && auth.token ? children : <Navigate to="/" />;
}
