import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFilm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    filmName: "",
    fiilmDate: "",
    filmTime: "",
    image: "",
    L1Price: "",
    L2Price: "",
    BoxPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      "https://4450e58b-7dfa-4db7-8ba3-81485943993f.mock.pstmn.io/addfilm",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    alert("🎉 Film added successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-lg bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          🎬 Add New Film
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Enter movie details to publish a new show
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <Input label="Film Name" name="filmName" onChange={handleChange} />
          <Input label="Release Date" name="fiilmDate" type="date" onChange={handleChange} />
          <Input label="Show Time" name="filmTime" type="time" onChange={handleChange} />
          <Input label="Poster Image URL" name="image" onChange={handleChange} />
          
          <div className="grid grid-cols-3 gap-3">
            <Input label="L1" name="L1Price" type="number" onChange={handleChange} />
            <Input label="L2" name="L2Price" type="number" onChange={handleChange} />
            <Input label="Box" name="BoxPrice" type="number" onChange={handleChange} />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-red-600 hover:bg-red-700 transition-all duration-200 py-3 rounded-xl text-white font-semibold text-lg shadow-lg"
          >
            ➕ Add Film
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({ label, name, type = "text", onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full rounded-lg bg-gray-800 text-white px-4 py-2
                   border border-gray-700 focus:outline-none
                   focus:ring-2 focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
  );
}

export default AddFilm;
