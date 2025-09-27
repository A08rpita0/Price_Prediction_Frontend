"use client";
import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/predict_home_price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, sqft, bhk, bath }),
    });

    const data = await res.json();
    setPrice(data.estimated_price);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🏠 Home Price Prediction</h1>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="Square Feet"
        value={sqft}
        onChange={(e) => setSqft(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="BHK"
        value={bhk}
        onChange={(e) => setBhk(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={bath}
        onChange={(e) => setBath(e.target.value)}
        className="border p-2 m-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Estimate Price
      </button>

      {price !== null && (
        <p className="mt-4 text-xl font-semibold">Estimated Price: ₹{price} Lakhs</p>
      )}
    </main>
  );
}
