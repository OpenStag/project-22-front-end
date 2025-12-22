import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function TicketBook() {
  const navigate = useNavigate();
  const { filmId: routeFilmId } = useParams();
  const location = useLocation();

  // Film selected from Home page (via navigate state)
  const selectedFilm = location.state?.film;

  /* ---------------- State ---------------- */
  const [films, setFilms] = useState([]);
  const [filmId, setFilmId] = useState(routeFilmId || "");
  const [email, setEmail] = useState("");

  const [customerId] = useState(
    "CUST-" + Math.floor(100000 + Math.random() * 900000)
  );

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  /* ---------------- Fetch Movies (SAME AS HOME) ---------------- */
  useEffect(() => {
    fetch("https://4450e58b-7dfa-4db7-8ba3-81485943993f.mock.pstmn.io/films")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [data];
        setFilms(list);

        // Auto-select movie if coming from Home page
        if (selectedFilm?.filmId) {
          setFilmId(selectedFilm.filmId);
        }
      })
      .catch((err) => console.error("Failed to load films", err));
  }, [selectedFilm]);

  /* ---------------- Generate Seats ---------------- */
  useEffect(() => {
    const generatedSeats = [];

    for (let i = 1; i <= 50; i++) {
      generatedSeats.push({ seatNo: `L1-${i}`, type: "Level1", booked: false });
    }
    for (let i = 1; i <= 25; i++) {
      generatedSeats.push({ seatNo: `L2-${i}`, type: "Level2", booked: false });
    }
    for (let i = 1; i <= 10; i++) {
      generatedSeats.push({ seatNo: `B-${i}`, type: "Box", booked: false });
    }

    // Example booked seats (replace with backend later)
    const bookedSeats = ["L1-3", "L2-5", "B-2"];

    setSeats(
      generatedSeats.map((seat) => ({
        ...seat,
        booked: bookedSeats.includes(seat.seatNo),
      }))
    );
  }, []);

  /* ---------------- Seat Click ---------------- */
  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.seatNo)
        ? prev.filter((s) => s !== seat.seatNo)
        : [...prev, seat.seatNo]
    );
  };

  /* ---------------- Seat Type ---------------- */
  const seatType =
    selectedSeats[0]?.startsWith("L1")
      ? "Level1"
      : selectedSeats[0]?.startsWith("L2")
      ? "Level2"
      : selectedSeats[0]
      ? "Box"
      : "";

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!filmId) {
      alert("Please select a movie");
      return;
    }

    if (!selectedSeats.length) {
      alert("Please select at least one seat");
      return;
    }

    const payload = {
      customerId,
      filmId,
      bookingSeats: selectedSeats.length.toString(),
      email,
      seatType,
    };

    console.log("Booking Payload:", payload);

    await fetch(
      `https://4450e58b-7dfa-4db7-8ba3-81485943993f.mock.pstmn.io/${filmId}/ticketbook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    alert("🎉 Booking Successful!");
    navigate("/");
  };

  /* ---------------- Selected Film Details ---------------- */
  const film = films.find((f) => f.filmId === filmId);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto bg-gray-900/90 border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          🎟 Booking Details
        </h2>

        {/* Movie Info Card */}
        {film && (
          <div className="flex gap-6 bg-gray-800 p-4 rounded-xl mb-6">
            <img
              src={film.image}
              alt={film.filmName}
              className="w-28 h-40 object-cover rounded-lg"
            />
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{film.filmName}</h3>
              <p>📅 {film.filmDate}</p>
              <p>⏰ {film.filmTime}</p>
              <p className="text-sm text-gray-400">
                L1: Rs.{film.L1Price} | L2: Rs.{film.L2Price} | Box: Rs.{film.BoxPrice}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Customer ID */}
          <Input label="Customer ID" value={customerId} disabled />

          {/* Movie Select (FROM HOME API) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Movie</label>
            <select
              name="filmId"
              value={filmId}
              onChange={(e) => setFilmId(e.target.value)}
              className="w-full rounded-lg bg-gray-800 text-white px-4 py-2 border border-gray-700"
              required
            >
              <option value="">Select Film</option>
              {films.map((film) => (
                <option key={film.filmId} value={film.filmId}>
                  {film.filmName}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Seat Hall */}
          <div>
            <h3 className="font-semibold mb-2">Select Your Seats</h3>

            <div className="grid grid-cols-10 gap-2">
              {seats.map((seat) => (
                <button
                  key={seat.seatNo}
                  type="button"
                  disabled={seat.booked}
                  onClick={() => handleSeatClick(seat)}
                  className={`
                    text-xs py-2 rounded
                    ${seat.booked ? "bg-red-600 cursor-not-allowed" : ""}
                    ${selectedSeats.includes(seat.seatNo)
                      ? "bg-green-600"
                      : !seat.booked
                      ? "bg-gray-600 hover:bg-gray-500"
                      : ""}
                  `}
                >
                  {seat.seatNo}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 text-sm text-gray-300">
              <span>⬜ Available</span>
              <span className="text-green-400">🟩 Selected</span>
              <span className="text-red-400">🟥 Booked</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-800 rounded-lg p-4 text-gray-300">
            <p>Seats Selected: {selectedSeats.length}</p>
            <p>Seat Type: {seatType || "-"}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold text-lg"
          >
            ✅ Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Reusable Input ---------------- */
function Input({ label, value, type = "text", onChange, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={!disabled}
        className="w-full rounded-lg bg-gray-800 text-white px-4 py-2
                   border border-gray-700 focus:outline-none
                   focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}

export default TicketBook;
