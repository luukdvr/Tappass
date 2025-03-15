"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Set background to white */}
      {/* Header */}
      <header className="w-full bg-white shadow-lg py-4 px-6 flex justify-center items-center relative">
        <Link href="/" legacyBehavior>
          <a>
            <Image src="/logo%20tappass.png" alt="Tappass Logo" width={225} height={75} />
          </a>
        </Link>
        <div className="absolute right-6">
          <Link href="/auth/login" legacyBehavior>
            <a className="text-blue-500 hover:text-blue-700 transition">Inloggen</a>
          </Link>
        </div>
      </header>

      {/* Pricing */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Prijzen</h2>
          <p className="text-lg mb-4">
            Bij Tappass bieden we verschillende prijsopties om aan je behoeften te voldoen. Kies het plan dat het beste bij je past:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"> {/* Add padding for consistent spacing */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full"> {/* Ensure consistent width */}
              <h3 className="text-xl font-bold mb-2">Basis</h3>
              <p className="text-gray-600 mb-4">€4,99 per maand</p>
              <ul className="list-disc list-inside mb-4">
                <li>1 Tappass kaart</li>
                <li>Basisfuncties</li>
                <li>Standaard ondersteuning</li>
              </ul>
              <a href="https://buy.stripe.com/28o7tz89c0bJ97aaEE" className="bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg hover:bg-blue-600 transition inline-block">
                Bestel nu
              </a>
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
