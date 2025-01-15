import React, { useState } from 'react';
import { Check, CreditCard, Lock } from 'lucide-react';

const CheckoutPage = ({ user }) => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = [
    { id: 'monthly', name: 'Monthly', price: '$14.99', period: '/month' },
    { id: 'yearly', name: 'Yearly', price: '$99.99', period: '/year', savings: 'Save 20%' },
  ];

  // const monthlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97636&page-template=18913&use-test-mode=true&secret-key=Bm_K$ADXnX&exfo=742&x-userEmail=${user.email}`;
  
  // const yearlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97637&page-template=18913&use-test-mode=true&secret-key=Bm_K$ADXnX&exfo=742&x-userEmail=${user.email}`;

  const monthlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97636&page-template=18913&exfo=742&x-userEmail=${user.email}&billing-email=${user.email}`;

  const yearlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97637&page-template=18913&exfo=742&x-userEmail=${user.email}&billing-email=${user.email}`;

  
  // Conditionally set the checkoutUrl based on the selected plan
  const checkoutUrl = selectedPlan === 'yearly' ? yearlyCheckoutUrl : monthlyCheckoutUrl;

  return (
    <div className="w-screen max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg" style={{ background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)' }}>
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 md:mb-8">
        Upgrade to Premium
      </h1>

      {/* Savings Banner */}
      <div className="bg-green-100 text-green-700 text-center py-2 sm:py-3 md:py-4 rounded-md mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg md:text-xl font-semibold">
        {selectedPlan === 'yearly' ? (
          <p>You're saving $60/year with our yearly plan!</p>
        ) : (
          <p>Save $60/year by switching to yearly and get 2 months free!</p>
        )}
      </div>

      {/* Plan Selection */}
      <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 border-2 text-base sm:text-lg font-medium transition-colors duration-200 ${
              selectedPlan === plan.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300'
            } rounded-lg mx-1 sm:mx-2`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
        <div className="flex-1 bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center transition-all duration-200 border-2 border-blue-600">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700 mb-4">
            Complete Your Payment
          </h2>
          {/* Iframe for Payment */}
          <div className="w-fit h-screen overflow-hidden">
            <iframe
              src={checkoutUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title="Payment Checkout"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
