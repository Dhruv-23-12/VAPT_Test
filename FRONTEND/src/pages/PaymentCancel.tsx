import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-red-700">Payment Cancelled</h1>
      <p className="text-lg mb-6">Your payment was not completed. You can try again or choose a different plan.</p>
      <Link to="/pricing" className="text-blue-600 hover:underline font-semibold">Back to Pricing</Link>
    </div>
  </div>
);

export default PaymentCancel; 