"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../supabaseClient"; // Import Supabase client
import Image from "next/image"; // Import Image component
import { useLanguage } from "../../../context/LanguageContext"; // Import Language context

const translations = {
  nl: {
    login: "Inloggen",
    email: "E-mail",
    password: "Wachtwoord",
    loginError: "Fout bij inloggen. Controleer je gegevens en probeer opnieuw.",
    invalidCredentials: "Geen account gevonden met deze gegevens. Controleer je gegevens en probeer opnieuw.",
  },
  en: {
    login: "Login",
    email: "Email",
    password: "Password",
    loginError: "Error logging in. Please check your credentials and try again.",
    invalidCredentials: "No account found with these credentials. Please check your credentials and try again.",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Login error:", error.message);
        setError(t.loginError);
      } else {
        // Check if the user is subscribed
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('is_subscribed')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          console.error("User data error:", userError.message);
          setError(t.loginError);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Er is een onverwachte fout opgetreden. Probeer het later opnieuw.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo%20tappass.png" alt="Tappass Logo" width={256} height={256} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t.login}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
            {t.login}
          </button>
        </form>
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