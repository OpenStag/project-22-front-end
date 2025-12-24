import { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Contact Us
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            value={form.userName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <textarea
            name="comment"
            placeholder="Your Message"
            rows="4"
            value={form.comment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-red-500"
          />

          <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
