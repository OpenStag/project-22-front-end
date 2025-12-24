import { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
