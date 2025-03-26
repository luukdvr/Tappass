"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../supabaseClient"; // Import Supabase client
import Image from "next/image"; // Import Image component
import { useLanguage } from "../../../context/LanguageContext"; // Import Language context

const translations = {
  nl: {
    register: "Aanmelden",
    email: "E-mail",
    password: "Wachtwoord",
    registerError: "Fout bij aanmelden. Controleer je gegevens en probeer opnieuw.",
    invalidCredentials: "Geen account gevonden met deze gegevens. Controleer je gegevens en probeer opnieuw.",
    login: "Al een account? Log hier in.",
  },
  en: {
    register: "Register",
    email: "Email",
    password: "Password",
    registerError: "Error registering. Please check your credentials and try again.",
    invalidCredentials: "No account found with these credentials. Please check your credentials and try again.",
    login: "Already have an account? Log in here.",
  },
};

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Registration error:", error.message);
        setError(t.registerError);
      } else {
        // Insert the new user into the users table
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: data.user.id, email: data.user.email, is_subscribed: false }]);
        
        if (insertError) {
          console.error("Insert user error:", insertError.message);
          setError(t.registerError);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error(error); // Zorg ervoor dat je de fout logt als dat nodig is
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo%20tappass.png" alt="Tappass Logo" width={256} height={256} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t.register}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">{t.email}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">{t.password}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            {t.register}
          </button>
        </form>
        <button onClick={() => router.push("/auth/login")} className="w-full text-blue-500 text-center mt-4">
          {t.login}
        </button>
      </div>
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleLanguage} className="p-2 rounded-full shadow-md">
          <Image
            src={language === 'nl' ? '/nl-flag.png' : '/uk-flag.png'}
            alt={language === 'nl' ? 'Dutch' : 'English'}
            width={64}
            height={64}
            className="rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
