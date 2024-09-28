import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import ExtensionSignUpPage from './ExtensionSignUpPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1> {/* Display user email when signed in */}
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
