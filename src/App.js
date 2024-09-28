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
          domain: "firebase-auth-setup.glitch.me", // Use your actual domain
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
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>{" "}
          {/* Display user email when signed in */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <ExtensionSignUpPage /> // Show the SignInPage component when not signed in
      )}
    </div>
  );
}

export default App;
