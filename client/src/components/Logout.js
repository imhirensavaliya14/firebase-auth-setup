import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig"; 
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        localStorage.removeItem("signupRedirectHandled");
        Cookies.remove("firebaseUser");
        await signOut(auth);
        console.log("User signed out successfully");
        navigate("/signin"); // Redirect to the sign-in page
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
