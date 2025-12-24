import React, { useState } from "react";

const PaymentDetails = () => {
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardholder: "",
    expiry: "",
    cvv: "",
    amount: "",
  });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment submitted (frontend test)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>

        <form className="space-y-4" onSubmit={handlePayment}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="text"
            name="cardholder"
            placeholder="Card Holder Name"
            value={payment.cardholder}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={payment.expiry}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={payment.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
