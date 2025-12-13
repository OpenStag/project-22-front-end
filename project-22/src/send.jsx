export const addFilm = async (film) => {
  const res = await fetch(
    "https://402e7acb-ffec-4f1e-85f9-becc21850683.mock.pstmn.io/films",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(film)
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add film");
  }

  return await res.json();
};
