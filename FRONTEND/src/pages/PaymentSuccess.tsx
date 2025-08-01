import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-700">Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your subscription is now active.</p>
      <Link to="/dashboard" className="text-blue-600 hover:underline font-semibold">Go to Dashboard</Link>
    </div>
  </div>
);

export default PaymentSuccess; 