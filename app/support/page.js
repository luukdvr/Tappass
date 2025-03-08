"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function SupportPage() {
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

      {/* Support */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p className="text-lg mb-4">
            Bij Tappass staan we klaar om je te helpen met al je vragen en problemen. Hier zijn enkele manieren waarop je ondersteuning kunt krijgen:
          </p>
          <h3 className="text-2xl font-bold mb-2">Veelgestelde Vragen</h3>
          <p className="text-lg mb-4">
            Bezoek onze FAQ-pagina voor antwoorden op veelgestelde vragen over Tappass. Hier vind je informatie over het gebruik van onze producten, bestellingen, verzending en meer.
          </p>
          <h3 className="text-2xl font-bold mb-2">Contactformulier</h3>
          <p className="text-lg mb-4">
            Heb je een specifieke vraag of probleem? Vul ons contactformulier in en ons ondersteuningsteam neemt zo snel mogelijk contact met je op.
          </p>
          <h3 className="text-2xl font-bold mb-2">E-mail Ondersteuning</h3>
          <p className="text-lg mb-4">
            Stuur ons een e-mail op support@tappass.nl en we zullen ons best doen om je binnen 24 uur te antwoorden.
          </p>
          <h3 className="text-2xl font-bold mb-2">Telefoon Ondersteuning</h3>
          <p className="text-lg mb-4">
            Bel ons op +31 123 456 789 voor directe ondersteuning. Onze telefonische ondersteuning is beschikbaar van maandag tot vrijdag, van 9:00 tot 17:00 uur.
          </p>
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
