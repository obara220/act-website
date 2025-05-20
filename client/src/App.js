import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Import BrowserRouter
import LoginRegisterForm from "./components/LoginRegisterContainer/LoginRegisterContainer";
import AdminCustomerContainer from "./components/AdminCustomerContainer/AdminCustomerContainer";
import logo from "./Login.png"
// Initialization for ES Users
import HeaderContainer from "./components/CrewDashboard/HeaderContainer";
import CrewContainer from "./components/CrewDashboard/CrewContainer";
import RealtimeChat from "../src/chat-component/realtime-chat";
// import { useMessagesQuery } from '/hooks/use-messages-query'

function App() {
  const [isUserAuthenticated, setUserAuthorization] = useState(false);
  const isUserAuthenticatedRedux = useSelector((state) => state.auth.isAuthenticated); // Access Redux state
  const [isAdmin, setAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true" || false
  );
  const [customerId, setCustomerId] = useState(
    sessionStorage.getItem("customerId") || undefined
  );
  // const { data: messages } = useMessagesQuery()

  const setUserAuthenticatedStatus = (isAdmin, customerId) => {
    setUserAuthorization(true);
    setAdmin(isAdmin);
    setCustomerId(customerId);
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isUserAuthenticated") === "true";
    setUserAuthorization(authStatus);
  }, []);


  const handleLogout = () => {
    sessionStorage.removeItem("isUserAuthenticated");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("jwt_refresh_token");
    setUserAuthorization(false);
    setAdmin(false);
    setCustomerId(undefined);
    // Use navigate to redirect to the login page
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Conditionally render LoginRegisterForm if not authenticated */}
        <Route path="/login" element={<LoginRegisterForm setUserAuthenticatedStatus={setUserAuthenticatedStatus} />} />

        {/* Protect routes that require authentication */}
        {isUserAuthenticatedRedux ? (
          <>
            <Route path="/crew" element={<CrewContainer />} />
            <Route path="/chat" element={<RealtimeChat roomName="my-chat-room" username="john_doe" />} />
            {/* <Route path="/dashboard" element={<AdminCustomerContainer />} /> */}
          </>
        ) : (
          <Route path="*" element={<LoginRegisterForm />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
