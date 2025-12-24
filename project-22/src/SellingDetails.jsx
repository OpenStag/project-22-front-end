import React, { useEffect, useState } from "react";

const SellingDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filmId = 1; 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/${filmId}/details`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data);
        setDetails(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [filmId]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  if (!details)
    return <p className="text-white text-center mt-10">No details available.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-3xl font-bold text-center mb-4">Selling Details</h2>

        <div>
          <p>Level 1 Seats: {details.level1}</p>
          <p>Level 2 Seats: {details.level2}</p>
          <p>Box Seats: {details.box}</p>
          <hr className="border-gray-700 my-2" />
          <p>Level 1 Total: Rs. {details.level1Price}</p>
          <p>Level 2 Total: Rs. {details.level2Price}</p>
          <p>Box Total: Rs. {details.boxPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default SellingDetails;
