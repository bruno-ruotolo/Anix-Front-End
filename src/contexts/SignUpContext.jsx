import { createContext, useState } from "react";

export const SignUpContext = createContext();

export default function SignUpProvider({ children }) {
  const [signUp, setSignUp] = useState(
    JSON.parse(localStorage.getItem("signUp"))
  );

  return (
    <SignUpContext.Provider value={{ signUp, setSignUp }}>
      {children}
    </SignUpContext.Provider>
  );
}
