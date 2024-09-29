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
        Cookies.set("firebaseUser", JSON.stringify(userInfo), {
          domain: "https://firebase-auth-setup.glitch.me/", 
          expires: 7, 
          secure: true,
        });

        if (window.chrome) {
          window.chrome.runtime.sendMessage(
            "nmamlcliogiihpdhhpfdgjhpnbbobfke",
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
