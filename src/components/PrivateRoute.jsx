import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  return auth ? children : navigate("/");
}
