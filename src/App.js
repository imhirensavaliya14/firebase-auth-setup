import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import Cookies from "js-cookie"; // Add this import statement

import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut
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
          domain: "https://firebase-auth-setup.glitch.me/", // Use your actual domain
          expires: 7, // Cookie will expire in 7 days
          secure: true, // Use secure cookies for HTTPS
        });

        // Send message to Chrome extension to notify user is logged in
        if (window.chrome) {
          // External webpage script
          window.chrome.runtime.sendMessage(
            "nmamlcliogiihpdhhpfdgjhpnbbobfke",
            { message: "loginSuccess", user: userInfo },
            function (response) {
              console.log(response);
            }
          );
        }

        setUser(user); // User is signed in
      } else {
        setUser(null); // No user is signed in
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    {user ? (
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome Back!</h1>

        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src=${`https://ui-avatars.com/api/?name=${user?.email}&background=4C51BF&color=fff&size=128`}
            alt="User Avatar"
            className="rounded-full mb-4"
          />
          <p className="text-lg text-gray-700">{user?.email}</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Account</h2>
          <p className="text-gray-600">Manage your settings or sign out below.</p>
          
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 w-full"
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <ExtensionSignUpPage /> // Render the sign-up page when not signed in
    )}
  </div>
);
}

export default App;
