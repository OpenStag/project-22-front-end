import { useEffect, useState } from "react";

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://4450e58b-7dfa-4db7-8ba3-81485943993f.mock.pstmn.io/films")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setFilms(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-red-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <h1 className="text-3xl font-bold">🎬 Movie Booking</h1>
          <p className="text-sm opacity-90 mt-1">
            Now Showing – Book Your Seats
          </p>
        </div>
      </header>

      {/* HERO */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Experience Movies Like Never Before
          </h2>
          <p className="text-gray-400">
            Choose your favorite movie, select your seat, and enjoy the show in comfort.
          </p>
        </div>
      </section>

      {/* MOVIES */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
              >
                <div className="h-64">
                  <img
                    src={film.image}
                    alt={film.filmName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-semibold">
                    {film.filmName}
                  </h3>

                  <div className="flex justify-between text-sm text-gray-400">
                    <span>📅 {film.filmDate}</span>
                    <span>⏰ {film.filmTime}</span>
                  </div>

                  <div className="border-t border-gray-700 pt-3 text-sm space-y-1">
                    <p>L1 Seat: <span className="font-semibold">Rs. {film.L1Price}</span></p>
                    <p>L2 Seat: <span className="font-semibold">Rs. {film.L2Price}</span></p>
                    <p>Box Seat: <span className="font-semibold">Rs. {film.BoxPrice}</span></p>
                  </div>

                  <button className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-xl font-semibold transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-500 text-center py-4 text-sm">
        © 2025 Movie Booking System. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
