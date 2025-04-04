"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../../styles/globals.css"; // Import global styles

export default function SupportPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAccountPopup = () => {
    setAccountPopupOpen(!accountPopupOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Set background to white */}
      {/* Header */}
      <header className="w-full bg-white shadow-lg py-4 px-6 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a>
            <Image src="/logo%20tappass.png" alt="Tappass Logo" width={225} height={75} />
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleAccountPopup} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Image src="/account.png" alt="Account" width={24} height={24} />
          </button>
          <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Image src="/burger-bar.png" alt="Menu" width={30} height={30} />
          </button>
        </div>
      </header>

      {/* Account Popup */}
      {accountPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleAccountPopup}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link href="/auth/login" legacyBehavior>
              <a style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Inloggen</a>
            </Link>
            <Link href="/auth/register" legacyBehavior>
              <a style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Registreren</a>
            </Link>
          </nav>
        </div>
      )}

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link href="/faq" legacyBehavior>
              <a style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>FAQ</a>
            </Link>
            <Link href="/pricing" legacyBehavior>
              <a style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Prijzen</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Contact</a>
            </Link>
          </nav>
        </div>
      )}

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
