import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const token = localStorage.getItem("auth");
  const userInfos = token ? jwt_decode(token) : null;

  const [auth, setAuth] = useState({ ...userInfos, token });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
