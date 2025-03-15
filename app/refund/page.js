"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function RefundPage() {
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

      {/* Refund Policy */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Terugbetalingsbeleid</h2>
          <p className="text-lg mb-4">
            Bij Tappass streven we ernaar om je volledige tevredenheid te garanderen met onze producten en diensten. Mocht je om welke reden dan ook niet tevreden zijn met je aankoop, bieden wij een 30-dagen garantie op al onze producten. Dit betekent dat je het product binnen 30 dagen na ontvangst kunt retourneren en een terugbetaling kunt aanvragen, onder de volgende voorwaarden:
          </p>
          <h3 className="text-2xl font-bold mb-2">Retourvoorwaarden</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Het product dient ongebruikt, in de originele staat en verpakking te worden geretourneerd.</li>
            <li>Alle bijbehorende accessoires en documenten dienen mee retour te worden gezonden.</li>
            <li>De retourzending moet goed verpakt zijn om schade tijdens transport te voorkomen.</li>
          </ul>
          <h3 className="text-2xl font-bold mb-2">Retourprocedure</h3>
          <p className="text-lg mb-4">
            Neem binnen 30 dagen na ontvangst contact op met onze klantenservice via e-mail of telefoon om een retour te melden. Wij zullen je voorzien van een retourlabel en instructies.
          </p>
          <p className="text-lg mb-4">
            Je ontvangt een bevestiging van de retouraanvraag, waarna je het product naar het opgegeven adres kunt terugsturen.
          </p>
          <p className="text-lg mb-4">
            Retourzendingen zijn op eigen kosten, tenzij het product defect of beschadigd is bij ontvangst.
          </p>
          <h3 className="text-2xl font-bold mb-2">Terugbetaling</h3>
          <p className="text-lg mb-4">
            Zodra wij het geretourneerde product in goede staat hebben ontvangen, zullen wij de terugbetaling verwerken. De terugbetaling wordt binnen 14 dagen na ontvangst van het product uitgevoerd via de oorspronkelijke betaalmethode.
          </p>
          <p className="text-lg mb-4">
            De terugbetaling omvat de aankoopprijs van het product. De verzendkosten voor de oorspronkelijke bestelling worden niet vergoed, tenzij het product defect of beschadigd was bij ontvangst.
          </p>
          <h3 className="text-2xl font-bold mb-2">Uitgezonderde producten</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Producten die niet in de originele staat verkeren of schade vertonen door verkeerd gebruik komen niet in aanmerking voor retour of terugbetaling.</li>
            <li>Digitale producten of diensten die al geactiveerd of gedownload zijn, kunnen niet worden geretourneerd.</li>
          </ul>
          <h3 className="text-2xl font-bold mb-2">Defecte of Beschadigde Producten</h3>
          <p className="text-lg mb-4">
            Indien je product defect of beschadigd aankomt, neem dan binnen 7 dagen na ontvangst contact met ons op. We bieden een vervangend product of volledige terugbetaling aan, afhankelijk van de situatie. De verzendkosten voor het retourneren van defecte producten worden door Tappass gedragen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Jouw rechten</h3>
          <p className="text-lg mb-4">
            Dit retour- en terugbetalingsbeleid is van toepassing naast de wettelijke consumentenrechten die je in jouw land hebt. Mocht je vragen hebben over dit beleid of problemen ondervinden met een bestelling, neem dan gerust contact op met onze klantenservice. Wij staan klaar om je te helpen en ervoor te zorgen dat je een geweldige ervaring hebt met Tappass.
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
