import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage('Please enter your email to reset your password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setStatusMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setStatusMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Logo" />
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handlePasswordReset}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Link
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {statusMessage && (
            <div className="mt-4 text-center text-sm text-red-600">{statusMessage}</div>
          )}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <a href="#" onClick={() => navigate('/signin')} className="font-medium text-blue-600 hover:text-blue-500">
          Log in here
        </a>
      </p>
    </div>
  );
}
