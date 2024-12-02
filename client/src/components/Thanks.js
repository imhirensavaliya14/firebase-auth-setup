import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Mail, User } from "lucide-react";

const BrowserThankYouPage = () => {
  // Get query parameters
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || "Guest"; // Default to "Guest" if name is missing
  const email = searchParams.get('email') || "Not provided"; // Default if email is missing

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        
        {/* Content */}
        <div className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={40} />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900">Successfully Connected!</h2>
          <p className="text-gray-600">You can now close this tab and start using the extension.</p>

          {/* User Details */}
          <div className="bg-blue-50 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-blue-500" size={24} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500" size={24} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
            </div>
          </div>

          {/* Success Indicator */}
          <div className="bg-green-50 py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="text-sm font-medium text-green-700">Extension is ready to use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserThankYouPage;
