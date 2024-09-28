import React, { useState } from 'react';
import { Facebook, Mail } from 'lucide-react';
import { googleProvider, facebookProvider, auth } from './firebaseConfig'; // Adjusted import statement
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function ExtensionSignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Sign up successful:', { user });
      setSignupStatus('Signup successful! Welcome, ' + name);
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupStatus('Error signing up: ' + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign In successful:', { user });
      setSignupStatus('Google Sign In successful! Welcome, ' + user.displayName);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setSignupStatus('Error signing in with Google: ' + error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Facebook Sign In successful:', { user });
      setSignupStatus('Facebook Sign In successful! Welcome, ' + user.displayName);
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      setSignupStatus('Error signing in with Facebook: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">FB</span>
        </div>
      </div>
         <h1 className="text-xl font-bold text-center mb-4">Sign Up</h1>        
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Full Name"
            required
          />
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Email"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Password (min. 8 characters)"
            required
          />
          
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm">
            Sign Up
          </button>
        </form>

        {signupStatus && (
          <div className="mb-4 text-center text-sm text-red-600">
            {signupStatus}
          </div>
        )}
        
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        
        <div className="space-y-2">
                 
          <button onClick={handleGoogleSignUp} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-red-500" />
            Sign Up with Google
          </button>
        </div>
        
        <p className="mt-4 text-center text-xs text-gray-600">
          Already have an account? <button onClick={() => console.log('Navigate to Login')} className="text-blue-600 hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
}
