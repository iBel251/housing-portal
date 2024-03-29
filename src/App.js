// App.js
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Houses from "./pages/Houses";
import Favorites from "./pages/Favorites";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Recommended from "./pages/Recommended";
import Admin from "./pages/admin/Admin";
import MessageDetail from "./components/messages/MessageDetail";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthContextProvider } from "./context/AuthContext";
import { HouseContextProvider } from "./context/HouseContext";
import { ChatContextProvider } from "./context/ChatContext";
import { RoommateContextProvider } from "./context/RoommateContext";
import { FeedbackContextProvider } from "./context/FeedbackContext";
import RoommateNotifications from "./components/messages/RoommateNotifications";
import ProtectedRoute from "./pages/ProtectedRoute";
import StoreInitializer from "./components/StoreInitializer";
import { useLocation } from "react-router-dom";
import HouseDetails from "./components/housesDisplay/HouseDetails";
import EditHouse from "./components/profile/EditHouse";
import Main from "./components/messages/Main";
import "./styles/customstyles.css";
import AdminContextProvider from "./context/AdminContext";
import PasswordResetPage from "./pages/PasswordResetPage";
import BlockedUserPage from "./pages/BlockedUserPage";
import PublicRoute from "./pages/PublicRoute";

const tele = window.Telegram.WebApp;
const NavContent = () => {
  const location = useLocation();
  return <>{location.pathname !== "/admin" && <Navbar />}</>;
};
const FooterContent = () => {
  const location = useLocation();
  return <>{location.pathname !== "/admin" && <Footer />}</>;
};
function App() {
  useEffect(() => {
    tele.ready();
  });

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <HouseContextProvider>
          <ChatContextProvider>
            <NotificationProvider>
              <RoommateContextProvider>
                <FeedbackContextProvider>
                  <AdminContextProvider>
                    <NavContent />
                    <StoreInitializer />
                    <Routes>
                      <Route
                        path="/user_blocked"
                        element={<BlockedUserPage />}
                      />
                      <Route
                        path="/password-reset"
                        element={<PasswordResetPage />}
                      />
                      <Route path="/" element={<Index />} />
                      <Route
                        path="houses"
                        element={
                          <ProtectedRoute>
                            <Houses />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="favorites"
                        element={
                          <ProtectedRoute>
                            <Favorites />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="messages"
                        element={
                          <ProtectedRoute>
                            <Messages />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Main />} />
                        <Route
                          path="/messages/notifications"
                          element={
                            <ProtectedRoute>
                              <RoommateNotifications />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/messages/:messageId"
                          element={<MessageDetail />}
                        />
                      </Route>
                      <Route
                        path="help"
                        element={
                          <ProtectedRoute>
                            <Help />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="signup"
                        element={
                          <PublicRoute>
                            <Signup />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="login"
                        element={
                          <PublicRoute>
                            <Login />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="admin"
                        element={
                          <ProtectedRoute adminOnly={true}>
                            <Admin />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="recommended"
                        element={
                          <ProtectedRoute>
                            <Recommended />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/houses/:houseId"
                        element={<HouseDetails />}
                      />
                      <Route path="/profile/:houseId" element={<EditHouse />} />
                    </Routes>
                    <FooterContent />
                  </AdminContextProvider>
                </FeedbackContextProvider>
              </RoommateContextProvider>
            </NotificationProvider>
          </ChatContextProvider>
        </HouseContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
