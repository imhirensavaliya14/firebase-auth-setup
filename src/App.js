import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard";
import AuthHandler from "./components/AuthHandler"; // Import AuthHandler

function App() {
  const [user, setUser] = useState(null);

  // Note: If you want to keep the user state in App.js, you'll need to pass user to AuthHandler as a prop and update it from there.
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <AuthHandler setUser={setUser} /> {/* Call AuthHandler here */}

        <Routes>
          {/* Default root URL redirect to /signup */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* Signup and Signin routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Dashboard route */}
          
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />} />

          {/* Fallback route if a user is not found */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
