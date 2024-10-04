import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cookies from "js-cookie";

function AuthHandler({ setUser }) { // Accept setUser as a prop
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

        if (window.chrome) {
          window.chrome.runtime.sendMessage(
            "plbbbdfnahnafhegeijepiojmabeggml",
            { message: "loginSuccess", user: userInfo },
            function (response) {
              console.log(response);
            }
          );
        }

        setUser(userInfo); // Update user state in App.js
        navigate("/dashboard"); // Redirect to dashboard after authentication
      } else {
        setUser(null); // Clear user state
      }
      setLoading(false); // Stop loading after user state is checked
    });

    return () => unsubscribe();
  }, [navigate, setUser]); // Add setUser to dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // Render nothing as this is only for navigation logic
}

export default AuthHandler;
