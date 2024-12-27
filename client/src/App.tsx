import { Route, Routes } from "react-router-dom";
import AuthCallback from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";

function App() {
  return (
    <>
      <header>
        <Routes>
          <Route
            path="/sso-callback"
            element={
              <AuthenticateWithRedirectCallback
                signInForceRedirectUrl={"/auth-callback"}
              />
            }
          />
          <Route path="/auth-callback" element={<AuthCallback />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </header>
    </>
  );
}

export default App;
