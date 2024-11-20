import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function BrowserThankYouPage() {
  const [showConfetti] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => prev < 3 ? prev + 1 : prev);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header - Responsive adjustments */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 flex items-center border-b">
          <img 
            src="/logo.png" 
            alt="FB Group Bulk Poster" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg mr-3" 
          />
          <div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">FB Group Bulk Poster</span>
            <div className="text-xs sm:text-sm text-green-600 font-medium">Premium Activated</div>
          </div>
        </div>

        {/* Main Content - Enhanced responsive padding */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Success Message - Adjusted text sizes */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-50">
              <CheckCircle size={32} className="sm:w-10 sm:h-10 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">You're All Set! 🎉</h1>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-md mx-auto">
              Welcome to premium! Your account has been upgraded successfully.
            </p>
          </div>

          {/* Steps - Improved spacing */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Step 1 */}
              <div className={`flex items-center transition-all duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 sm:mr-4">
                  1
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-blue-900 text-base sm:text-lg mb-0.5 sm:mb-1">Payment Confirmed</h3>
                  <p className="text-blue-800 text-sm sm:text-base">Your premium subscription is now active</p>
                </div>
                {activeStep >= 1 && <CheckCircle size={20} className="text-blue-500 ml-2" />}
              </div>

              {/* Step 2 */}
              <div className={`flex items-center transition-all duration-300 ${activeStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 sm:mr-4">
                  2
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-blue-900 text-base sm:text-lg mb-0.5 sm:mb-1">Account Updated</h3>
                  <p className="text-blue-800 text-sm sm:text-base">Premium features unlocked and ready</p>
                </div>
                {activeStep >= 2 && <CheckCircle size={20} className="text-blue-500 ml-2" />}
              </div>

              {/* Step 3 */}
              <div className={`flex items-center transition-all duration-300 ${activeStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 sm:mr-4">
                  3
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-blue-900 text-base sm:text-lg mb-0.5 sm:mb-1">Time to Start Posting!</h3>
                  <p className="text-blue-800 text-sm sm:text-base">Simply close this tab to begin</p>
                </div>
                {activeStep >= 3 && <CheckCircle size={20} className="text-blue-500 ml-2" />}
              </div>
            </div>
          </div>

          {/* Final Message - Responsive text */}
          <div className="text-center bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8">
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium mb-2">
              Ready to revolutionize your Facebook group posting?
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Close this tab and fire up your extension - your premium journey begins now! 
              Start reaching more groups and saving hours of work with just a few clicks.
            </p>
          </div>
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-8 bg-blue-500 animate-fall-slow" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-0 left-1/2 w-2 h-8 bg-yellow-500 animate-fall-slow" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-0 right-1/4 w-2 h-8 bg-green-500 animate-fall-slow" style={{ animationDelay: '0.8s' }} />
          </div>
        )}
      </div>
    </div>
  );
}
