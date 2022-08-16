import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { __swalErrorMessage } from "../utils/utils";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  if (!(auth && auth.token))
    __swalErrorMessage("Session is Expired or Invalid", "Please, Login Again!");
  return auth && auth.token ? children : <Navigate to="/" />;
}
