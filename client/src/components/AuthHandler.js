import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cookies from "js-cookie";


function AuthHandler({ setUser }) { 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
        };
        Cookies.set("firebaseUser", JSON.stringify(userInfo), {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Lax",
        });

        console.log('Environment Variables:', process.env);

        // Use the base URL from environment variables
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        // Send user email to the server
        
        try {
          const response = await fetch(`${baseUrl}/store-email`, { // Use the base URL
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important! This allows cookies to be sent with the request
            body: JSON.stringify({ email: user.email }), // Send the logged-in user's email
          });

          if (!response.ok) {
            throw new Error('Failed to store email in session.');
          }

          console.log('Email successfully stored in session.');
        } catch (error) {
          console.error('Error storing email:', error);
        }

        if (window.chrome) {
          window.chrome.runtime.sendMessage(
            "plbbbdfnahnafhegeijepiojmabeggml",
            { message: "loginSuccess", user: userInfo },
            function (response) {
              console.log(response);
            }
          );
        }

        setUser(userInfo); // Update user state
        // Only redirect to the dashboard if the current path is root or signin/signup
        if (location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/signup") {
          navigate("/dashboard");
        } else {
          console.log('navigate to >>>> ', location.pathname + 'user >> ' + userInfo.email);
        }
      } else {
        setUser(null); // Clear user state
        navigate("/signin");
      }
      setLoading(false); // Stop loading after user state is checked
    });

    return () => unsubscribe();
  }, [navigate, location, setUser]); // Add location to dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // Render nothing as this is only for navigation logic
}

export default AuthHandler;
