"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function ShippingPage() {
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

      {/* Shipping Information */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Verzending</h2>
          <p className="text-lg mb-4">
            Bij Tappass doen we er alles aan om je bestelling snel en veilig te leveren. Hieronder vind je alles wat je moet weten over ons verzendproces:
          </p>
          <h3 className="text-2xl font-bold mb-2">Verwerkingstijd</h3>
          <p className="text-lg mb-4">
            Bestellingen worden doorgaans binnen 1-2 werkdagen na ontvangst van je bestelling verwerkt. Wij streven ernaar om je bestelling zo snel mogelijk te verzenden.
          </p>
          <h3 className="text-2xl font-bold mb-2">Verzendmethoden en Levertijd</h3>
          <p className="text-lg mb-4">
            De levertijd van je bestelling bedraagt doorgaans 1-2 werkdagen, afhankelijk van je locatie. Wij bieden verschillende verzendopties aan, van standaard tot versnelde verzending, zodat je de keuze hebt die het beste bij je past. Zodra je bestelling is verzonden, ontvang je een trackingnummer zodat je de voortgang kunt volgen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Verzendkosten</h3>
          <p className="text-lg mb-4">
            De verzendkosten zijn gratis.
          </p>
          <h3 className="text-2xl font-bold mb-2">Internationale Verzending</h3>
          <p className="text-lg mb-4">
            Wij bieden internationale verzending aan naar geselecteerde landen. Voor internationale bestellingen kunnen de levertijden variëren, afhankelijk van de bestemming en lokale douaneprocedures. Houd er rekening mee dat er extra kosten kunnen worden verbonden aan invoerrechten, belastingen of andere heffingen die door de wetgeving van het land van bestemming worden opgelegd.
          </p>
          <h3 className="text-2xl font-bold mb-2">Verzendbevestiging en Tracking</h3>
          <p className="text-lg mb-4">
            Na verzending van je bestelling ontvang je een bevestigingsmail met een trackingnummer. Hiermee kun je de status van je bestelling volgen totdat deze bij je wordt afgeleverd.
          </p>
          <h3 className="text-2xl font-bold mb-2">Niet-afgeleverde Pakketten</h3>
          <p className="text-lg mb-4">
            Als je pakket niet wordt afgeleverd of verloren gaat tijdens het transport, neem dan binnen 7 dagen na de verwachte leverdatum contact op met onze klantenservice. Wij zullen de zaak onderzoeken en ervoor zorgen dat je bestelling alsnog wordt geleverd of je een oplossing wordt geboden.
          </p>
          <h3 className="text-2xl font-bold mb-2">Fouten in het Adres</h3>
          <p className="text-lg mb-4">
            Zorg ervoor dat je het juiste adres invoert bij het afrekenen. Tappass is niet verantwoordelijk voor vertragingen of niet-afgeleverde pakketten als het verzendadres onjuist of incompleet is opgegeven.
          </p>
          <h3 className="text-2xl font-bold mb-2">Speciale Verzendverzoeken</h3>
          <p className="text-lg mb-4">
            Indien je speciale verzendbehoeften hebt, zoals specifieke levertijden of adresaanpassingen, neem dan vooraf contact op met onze klantenservice. We doen ons best om aan je verzoeken te voldoen, afhankelijk van de beschikbaarheid en verzendopties.
          </p>
          <h3 className="text-2xl font-bold mb-2">Verpakking</h3>
          <p className="text-lg mb-4">
            Al onze producten worden zorgvuldig verpakt om schade tijdens het transport te voorkomen. We gebruiken gerecycled materiaal waar mogelijk om onze impact op het milieu te minimaliseren.
          </p>
          <h3 className="text-2xl font-bold mb-2">Bezorging van Pakketten</h3>
          <p className="text-lg mb-4">
            Alle bestellingen worden bezorgd door betrouwbare koeriersdiensten. In geval van vertragingen of problemen met de bezorging van je pakket, zullen we je tijdig informeren.
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
