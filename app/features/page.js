"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function FeaturesPage() {
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

      {/* Features */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-lg mb-4">
            Tappass biedt een breed scala aan functies om je netwerkervaring te verbeteren. Hier zijn enkele van de belangrijkste kenmerken:
          </p>
          <h3 className="text-2xl font-bold mb-2">Eenvoudig Delen</h3>
          <p className="text-lg mb-4">
            Met Tappass kun je eenvoudig je contactgegevens en social media-profielen delen met één tap. Geen gedoe meer met papieren visitekaartjes.
          </p>
          <h3 className="text-2xl font-bold mb-2">Duurzaam</h3>
          <p className="text-lg mb-4">
            Bespaar papier en kies voor een duurzame oplossing met Tappass. Onze digitale visitekaartjes zijn milieuvriendelijk en gemakkelijk te gebruiken.
          </p>
          <h3 className="text-2xl font-bold mb-2">Professioneel</h3>
          <p className="text-lg mb-4">
            Maak een sterke eerste indruk met een modern visitekaartje. Tappass helpt je om professioneel over te komen en je netwerk uit te breiden.
          </p>
          <h3 className="text-2xl font-bold mb-2">Veilig</h3>
          <p className="text-lg mb-4">
            Je gegevens zijn veilig bij ons. We gebruiken de nieuwste beveiligingstechnologieën om ervoor te zorgen dat je informatie beschermd is.
          </p>
          <h3 className="text-2xl font-bold mb-2">Aanpasbaar</h3>
          <p className="text-lg mb-4">
            Personaliseer je Tappass met je eigen ontwerp en voeg de informatie toe die je wilt delen. Maak je visitekaartje uniek en opvallend.
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
