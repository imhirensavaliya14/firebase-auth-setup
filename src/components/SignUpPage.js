import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Eye, EyeOff, Zap } from 'lucide-react';
import { googleProvider, facebookProvider, auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setStatusMessage('Signup successful! Welcome, ' + name);
      navigate('/dashboard');
    } catch (error) {
      setStatusMessage('Error: ' + error.message);
    }

  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setStatusMessage('Google Sign In successful! Welcome, ' + user.displayName);
    } catch (error) {
      setStatusMessage('Error signing in with Google: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="./logo.png" alt="Your Logo" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Start Creating Today
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
        Join thousands of creators and share your ideas with the world
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-2 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
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
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          {statusMessage && (
            <div className="mt-4 text-center text-sm text-red-600">{statusMessage}</div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <Mail className="w-5 h-5 text-red-500 mr-2" />
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow sm:rounded-lg sm:px-10 py-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Zap className="h-5 w-5 text-yellow-400 mr-2" />
            Get started instantly
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              'Create 6 free posts to kickstart your journey',
              'Join a community of passionate creators',
              'Access powerful creation tools',
              'Reach a global audience with your ideas',
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm text-gray-700">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Already have an account?
          <button onClick={() => navigate('/signin')} className="text-blue-600 hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
}
