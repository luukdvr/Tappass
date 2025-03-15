"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import supabase from "../supabaseClient"; // Import Supabase client
import "./styles/globals.css"; // Import global styles

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: userData } = await supabase
          .from('users')
          .select('is_subscribed')
          .eq('id', session.user.id)
          .single();
        if (userData) {
          setIsSubscribed(userData.is_subscribed);
        }
      }
    };
    fetchUser();
  }, []);

  const handleDashboardClick = () => {
    if (isSubscribed) {
      window.location.href = "/dashboard";
    } else {
      alert("Je hebt geen toegang tot het dashboard. Neem contact op met support.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Set background to white */}
      {/* Header */}
      <header className="w-full bg-white shadow-lg py-4 px-6 flex justify-center items-center relative">
        <Link href="/" legacyBehavior>
          <a>
            <Image src="/logo%20tappass.png" alt="Tappass Logo" width={225} height={75} />
          </a>
        </Link>
        <div className="absolute right-6 flex space-x-4">
          {user ? (
            <>
              <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700 transition">Uitloggen</button>
              <button onClick={handleDashboardClick} className="text-blue-500 hover:text-blue-700 transition">Dashboard</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700 transition">Inloggen</a>
              </Link>
              <Link href="/auth/register" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700 transition">Aanmelden</a>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Banner */}
      <div className="relative w-full h-[36rem]"> {/* Double the height */}
        <Image
          src="/Untitled design (40).png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl font-bold">Jouw digitale visitekaartje in één tap</h1>
          <p className="text-lg mt-2">Deel al je contactgegevens en social media met één tap. Tappass is de moderne vervanger voor het traditionele visitekaartje.</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Waarom Tappass?</h2>
          <p className="text-lg mb-8">
            Tappass is de eenvoudigste manier om je netwerk te beheren en te delen. Met één scan heb je toegang tot alle contactgegevens die je nodig hebt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"> {/* Add padding for consistent spacing */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
              <h3 className="text-xl font-bold mb-2">Duurzaam</h3>
              <p className="text-gray-600">Bespaar papier en kies voor een duurzame oplossing met Tappass.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
              <h3 className="text-xl font-bold mb-2">Eenvoudig</h3>
              <p className="text-gray-600">Tap je kaartje tegen een telefoon en deel direct al je gegevens.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
              <h3 className="text-xl font-bold mb-2">Professioneel</h3>
              <p className="text-gray-600">Maak een sterke eerste indruk met een modern visitekaartje.</p>
            </div>
          </div>
          <a href="https://buy.stripe.com/5kA7tzgFIe2z6Z2fYZ" className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition mt-8 inline-block">
            Bestel nu
          </a>
        </div>
      </div>

      {/* Ontmoet Tappass */}
      <div className="bg-gray-100 py-12"> {/* Set background to very light gray */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Ontmoet Tappass</h2>
          <p className="text-lg mb-8">
            Tappass is jouw digitale visitekaartje voor de moderne tijd. Met één simpele tap deel je al je professionele informatie, contactgegevens en social media. Geen gedoe meer met papieren kaartjes die kwijtraken of verouderen.
          </p>
          <Image src="/Q2keFfmxRcifobsHZdZSyQ.png" alt="Ontmoet Tappass" width={600} height={400} className="mx-auto rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* Hoe werkt Tappass? */}
      <div className="py-12 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Hoe werkt Tappass?</h2>
          <p className="text-lg mb-8">
            Tappass is eenvoudig te gebruiken. Scan de QR-code en krijg direct toegang tot alle contactgegevens.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"> {/* Add padding for consistent spacing */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
            <h3 className="text-xl font-bold mb-2">Bestel je Tappass</h3>
            <p className="text-gray-600">Kies je design en personaliseer je digitale visitekaartje.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
            <h3 className="text-xl font-bold mb-2">Stel je profiel in</h3>
            <p className="text-gray-600">Voeg je contactgegevens en social media links toe aan je profiel.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
            <h3 className="text-xl font-bold mb-2">Deel met één tap</h3>
            <p className="text-gray-600">Houd je Tappass tegen een telefoon en deel direct je gegevens.</p>
          </div>
        </div>
      </div>

      {/* Wat anderen zeggen */}
      <div className="bg-gray-100 py-12"> {/* Set background to very light gray */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Wat anderen zeggen</h2>
          <p className="text-lg mb-8">
            Lees de ervaringen van onze tevreden klanten en ontdek hoe Tappass hun netwerkervaring heeft verbeterd.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"> {/* Add padding for consistent spacing */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full"> {/* Ensure consistent width */}
              <p className="text-gray-800">&ldquo;Tappass heeft mijn netwerkervaring enorm verbeterd. Het is zo eenvoudig te gebruiken!&rdquo;</p>
              <p className="text-gray-600 mt-2">- Jan de Vries</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full"> {/* Ensure consistent width */}
              <p className="text-gray-800">&ldquo;Ik kan nu al mijn contacten beheren met slechts één scan. Geweldig!&rdquo;</p>
              <p className="text-gray-600 mt-2">- Maria Janssen</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full"> {/* Ensure consistent width */}
              <p className="text-gray-800">&ldquo;Tappass heeft mijn professionele netwerk naar een hoger niveau getild. Een must-have voor iedereen!&rdquo;</p>
              <p className="text-gray-600 mt-2">- Peter van Dam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-12">
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <Link href="/" legacyBehavior>
            <a>
              <Image src="/logo%20tappass.png" alt="Tappass Logo" width={150} height={45} className="mx-auto mb-4" />
            </a>
          </Link>
          <p className="text-gray-600 mb-4">De moderne manier om je contactgegevens te delen.</p>
          <div className="flex flex-wrap justify-center space-x-4 mb-4">
            <Link href="/product" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Product</a></Link>
            <Link href="/features" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Features</a></Link>
            <Link href="/pricing" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Prijzen</a></Link>
            <Link href="/support" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Support</a></Link>
            <Link href="/faq" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">FAQ</a></Link>
            <Link href="/contact" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Contact</a></Link>
            <Link href="/shipping" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Verzending</a></Link>
            <Link href="/legal" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Juridisch</a></Link>
            <Link href="/privacy" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Privacy</a></Link>
            <Link href="/refund" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Terugbetalingsbeleid</a></Link>
          </div>
          <p className="text-gray-600">© 2023 Tappass. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
