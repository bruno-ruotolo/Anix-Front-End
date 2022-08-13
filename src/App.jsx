import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import SignUpProvider from "./contexts/SignUpContext";
import GlobalStyled from "./global/GlobalStyled";
import SignIn from "./pages/signIn/SignIn";

import SignUpCredentials from "./pages/signUp/SignUpCredentials";
import SignUpGenres from "./pages/signUp/SignUpGenres";
import SignUpInfos from "./pages/signUp/SignUpInfos";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home/Home";
import Anime from "./pages/anime/Anime";
import UserStatusAnime from "./pages/userStatusAnime/UserStatusAnime";
import Profile from "./pages/profile/Profile";
import Season from "./pages/season/Season";

export default function App() {
  return (
    <AuthProvider>
      <SignUpProvider>
        <BrowserRouter>
          <GlobalStyled />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUpCredentials />} />
            <Route path="/signup/infos" element={<SignUpInfos />} />
            <Route path="/signup/genres" element={<SignUpGenres />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/anime/:id"
              element={
                <PrivateRoute>
                  <Anime />
                </PrivateRoute>
              }
            />

            <Route
              path="/user/animes"
              element={
                <PrivateRoute>
                  <UserStatusAnime />
                </PrivateRoute>
              }
            />

            <Route
              path="/user/:useId"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/season"
              element={
                <PrivateRoute>
                  <Season />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </SignUpProvider>
    </AuthProvider>
  );
}
