"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function ContactPage() {
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
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Image src="/logout.png" alt="Logout" width={24} height={24} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Image src="/account.png" alt="Account" width={24} height={24} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Image src="/burger-bar.png" alt="Menu" width={30} height={30} />
          </button>
        </div>
      </header>

      {/* Contact Information */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Neem contact met ons op</h2>
          <p className="text-lg mb-4">
            Als je contact met ons wilt opnemen, stuur dan een e-mail naar{" "}
            <a href="mailto:info@tappass.nl" className="text-blue-500 hover:text-blue-700 transition">
              info@tappass.nl
            </a>.
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
          <p className="text-gray-600">© 2023 Tappass. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
