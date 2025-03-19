"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "../../../supabaseClient"; // Import Supabase client
import Image from "next/image"; // Import Image component

export default function PreviewPage() {
  const [designImage, setDesignImage] = useState(null); // State for the design image URL
  const [error, setError] = useState(null); // State for error messages
  const params = useParams(); // Get the route params

  useEffect(() => {
    if (!params || !params.id) return;

    const fetchDesign = async () => {
      try {
        const { data, error } = await supabase
          .from("users") // Correct table name
          .select("pasimageurl") // Correct column name
          .eq("id", params.id) // Match the user ID
          .single();

        if (error) {
          throw error;
        }

        setDesignImage(data.pasimageurl); // Set the design image URL
      } catch (err) {
        console.error("Error fetching design:", err);
        setError("Fout bij het ophalen van het design. Probeer het later opnieuw.");
      }
    };

    fetchDesign();
  }, [params]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
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
        <div>Design wordt geladen...</div>
      )}
    </div>
  );
}
