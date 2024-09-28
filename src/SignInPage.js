// SignInPage.js
import React, { useState } from 'react';
import { Facebook, Mail } from 'lucide-react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignInPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful:', userCredential.user);
      // Optionally save the name in a database or user profile
    } catch (error) {
      console.error('Error during sign up:', error.message);
      alert(error.message); // Show error message
    }
  };

  return (
    <div className="w-[300px] bg-white p-4 text-sm">
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">FB</span>
        </div>
      </div>
      
      <h1 className="text-xl font-bold text-center mb-4">Sign Up</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Full Name"
          required
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Email"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Password (min. 8 characters)"
          required
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 text-xs">
          Sign Up
        </button>
      </form>
      
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-3 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center text-xs">
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          Sign Up with Facebook
        </button>
        
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-3 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center text-xs">
          <Mail className="w-4 h-4 mr-2 text-red-500" />
          Sign Up with Google
        </button>
      </div>
      
      <p className="mt-4 text-center text-xs">
        Already have an account? <a href="#" className="text-blue-600 hover:underline">Log In</a>
      </p>
    </div>
  );
}
