import React from "react";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig"; 
import { signOut } from "firebase/auth";

const Dashboard = ({ user }) => {
  console.log("User in Dashboard: ", user); // Add this line to debug

  const handleLogout = async () => {
    try {
      Cookies.remove("firebaseUser");
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login if user is null
  }

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=4C51BF&color=fff&size=128`}
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
  );
};

export default Dashboard;
