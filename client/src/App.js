import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import CheckoutPage from "./components/CheckoutPage";
import ThankyouPage from "./components/Thanks";
import Logout from "./components/Logout"; // Import the Logout component


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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/thankyou" element={<ThankyouPage />} />
          {/* <Route path="/checkout"  element={<CheckoutPage user={user} />} /> */}
          <Route path="/checkout" element={user ? <CheckoutPage user={user} /> : <CheckoutPage user={{}} />} />


          {/* Dashboard route */}
          
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />} />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />

          {/* Fallback route if a user is not found */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
