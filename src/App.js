import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import Cookies from "js-cookie";

import { onAuthStateChanged, signOut } from "firebase/auth"; 
import ExtensionSignUpPage from "./ExtensionSignUpPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
        };
        console.log('userInfo >>> ',userInfo);
        Cookies.set("firebaseUser", JSON.stringify(userInfo), {
        domain: "firebase-auth-setup.glitch.me",  // Domain without the protocol
        expires: 7,                               // Expire after 7 days
        path: '/',                                // Ensure the cookie is valid across all paths
        secure: true,                             // Use secure flag for HTTPS only
        sameSite: 'Lax'                           // Optional: Set SameSite attribute
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

        setUser(user); 
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); 
  }, []);

const handleLogout = async () => {
  try {
    // Remove the cookie for the logged-in user
    Cookies.remove("firebaseUser", { domain: "firebase-auth-setup.glitch.me", path: '/' });

    Cookies.remove("firebaseUser", { domain: "firebase-auth-setup.glitch.me" }); // Use your actual domain
    Cookies.remove("firebaseUser", { domain: ".glitch.me", path: '/', secure: true }); // Adjust domain and options accordingly
    if (window.chrome) {
    window.chrome.runtime.sendMessage(
    "plbbbdfnahnafhegeijepiojmabeggml",
    { message: "logout", user: {} },
    function (response) {
    console.log(response);
    }
    );
    }
    await signOut(auth); 
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src={
                user && user.email
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=4C51BF&color=fff&size=128`
                  : "https://ui-avatars.com/api/?name=Guest&background=4C51BF&color=fff&size=128"
              }
              alt="User Avatar"
              className="rounded-full mb-4"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user.email}
          </h1>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <ExtensionSignUpPage />
      )}
    </div>
  );
}

export default App;
