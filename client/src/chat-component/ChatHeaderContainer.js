import { useState } from "react";
// import logo from "../../Login.png";
import { FaSearch, FaSignOutAlt, FaArrowLeft, FaPaperPlane  } from "react-icons/fa"; // Import the search icon
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Driver from "../images/Male.png"
const ChatHeaderContainer = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogout = () => {
        sessionStorage.removeItem("isUserAuthenticated");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("customerId");
        sessionStorage.removeItem("jwt_token");
        sessionStorage.removeItem("jwt_refresh_token");
        // setUserAuthorization(false);
        // setAdmin(false);
        // setCustomerId(undefined);
        // history.push("/login"); // Adjust the route if needed
        navigate("/login"); // Use navigate to redirect to the login page

    };
    const handleBack = () => {
        navigate("/crew")
    }
    return (
        <div className="header-container">
            <div className="header-left flex">
                <div>
                    <img src={Driver} alt="ACT Logo" className="header-left img" />
                </div>
                <div>
                    <h1 className="header-title">
                        <span>Jhon Doe</span>
                    </h1>
                    <p className="header-subtitle" style={{color: '#1cdb1c'}}>Online</p>
                </div>
            </div>
            {/* <div className="flex items-center justify-between"> */}
            <div onClick={handleBack} className="flex justify-between items-center w-20 back-button cursor-pointer">
                <FaArrowLeft />
                <span>Back</span>
            </div>
            {/* </div> */}

        </div>


    );
}

export default ChatHeaderContainer;
