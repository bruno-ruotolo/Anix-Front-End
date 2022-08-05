import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import SignUpProvider from "./contexts/SignUpContext";
import GlobalStyled from "./global/GlobalStyled";

import SignUpCredentials from "./pages/signUp/SignUpCredentials";

export default function App() {
  return (
    <AuthProvider>
      <SignUpProvider>
        <BrowserRouter>
          <GlobalStyled />
          <Routes>
            <Route path="/signup" element={<SignUpCredentials />} />
          </Routes>
        </BrowserRouter>
      </SignUpProvider>
    </AuthProvider>
  );
}
