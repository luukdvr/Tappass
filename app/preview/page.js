"use client";

import { useState } from "react";
import supabase from "../../supabaseClient"; // Import Supabase client
import Image from "next/image"; // Import Image component

export default function PreviewPage() {
  const [designImage, setDesignImage] = useState(null); // State for the design image URL
  const [email, setEmail] = useState(""); // State for the email input
  const [error, setError] = useState(null); // State for error messages

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Voer een geldig e-mailadres in.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users") // Correct table name
        .select("pasimageurl") // Correct column name
        .eq("email", email) // Match the email
        .single();

      if (error) {
        throw error;
      }

      setDesignImage(data.pasimageurl); // Set the design image URL
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching design:", err);
      setError("Geen design gevonden voor dit e-mailadres.");
      setDesignImage(null); // Clear the previous design image
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      {/* Search Bar */}
      <div className="w-full max-w-md mb-6">
        <input
          type="email"
          placeholder="Voer een e-mailadres in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Zoek
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Preview Section */}
      {designImage ? (
        <div className="relative w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">Pas Design</h1>
          <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={designImage}
              alt="Pas Design"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      ) : (
        <div>Voer een e-mailadres in om een design te zoeken.</div>
      )}
    </div>
  );
}
