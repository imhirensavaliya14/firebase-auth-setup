// App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SignInPage from './SignInPage';

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

  return (
    <div className="App">
      {user ? (
        <h1>Welcome, {user.email}</h1> // Display user email when signed in
      ) : (
        <SignInPage /> // Show the SignInPage component when not signed in
      )}
    </div>
  );
}

export default App;
