"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function LegalPage() {
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

      {/* Legal Information */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Wettelijke kennisgeving</h2>
          <p className="text-lg mb-4">
            De inhoud van de Tappass-website, inclusief maar niet beperkt tot teksten, afbeeldingen, logo&apos;s, grafische ontwerpen, iconen, software en andere materialen (gezamenlijk &quot;Inhoud&quot;), is eigendom van Tappass of haar licentiegevers en wordt beschermd door de toepasselijke auteursrechten, merken, handelsgeheimen en andere intellectuele eigendomsrechten.
          </p>
          <h3 className="text-2xl font-bold mb-2">Intellectuele Eigendom</h3>
          <p className="text-lg mb-4">
            Alle inhoud op de Tappass-website, inclusief het ontwerp, de lay-out, de tekst en de grafische elementen, zijn het eigendom van Tappass of de respectieve eigenaars en worden beschermd door nationale en internationale auteursrechten en andere intellectuele eigendomsrechten. Het is verboden om de inhoud zonder schriftelijke toestemming van Tappass te gebruiken, reproduceren, distribueren, publiceren of verkopen, tenzij anders vermeld.
          </p>
          <h3 className="text-2xl font-bold mb-2">Beperking van Aansprakelijkheid</h3>
          <p className="text-lg mb-4">
            Tappass doet haar uiterste best om de informatie op de website correct en actueel te houden, maar kan niet garanderen dat alle informatie volledig, juist of up-to-date is. Tappass is niet aansprakelijk voor enige schade, verlies of kosten die voortvloeien uit het gebruik van de website, inclusief maar niet beperkt tot directe, indirecte, incidentele, speciale of gevolgschade, tenzij anders vereist door de wet.
          </p>
          <h3 className="text-2xl font-bold mb-2">Gebruik van de Website</h3>
          <p className="text-lg mb-4">
            Je mag de Tappass-website alleen gebruiken voor legitieme doeleinden en in overeenstemming met de wet. Je mag geen illegale, schadelijke of frauduleuze activiteiten uitvoeren via onze website of de producten en diensten die wij aanbieden. Tappass behoudt zich het recht voor om toegang tot de website of bepaalde diensten te beperken of te beëindigen indien we vermoeden dat je de voorwaarden of toepasselijke wetgeving schendt.
          </p>
          <h3 className="text-2xl font-bold mb-2">Links naar Derden</h3>
          <p className="text-lg mb-4">
            De Tappass-website kan links bevatten naar externe websites die niet onder de controle staan van Tappass. Wij zijn niet verantwoordelijk voor de inhoud, het beleid of de praktijken van websites van derden. Het gebruik van deze externe websites is op eigen risico, en we raden aan de voorwaarden en privacybeleidsmaatregelen van de betreffende websites zorgvuldig te lezen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Privacybeleid</h3>
          <p className="text-lg mb-4">
            Tappass respecteert de privacy van haar gebruikers. Alle persoonsgegevens die via de website worden verzameld, worden behandeld in overeenstemming met ons Privacybeleid. Door gebruik te maken van onze diensten geef je toestemming voor het verzamelen en verwerken van je gegevens zoals beschreven in ons Privacybeleid.
          </p>
          <h3 className="text-2xl font-bold mb-2">Wijzigingen van de Kennisgeving</h3>
          <p className="text-lg mb-4">
            Tappass behoudt zich het recht voor om deze wettelijke kennisgeving op elk moment te wijzigen, zonder voorafgaande kennisgeving. Wij raden je aan deze kennisgeving regelmatig te raadplegen om op de hoogte te blijven van eventuele wijzigingen. Door de website te blijven gebruiken, ga je akkoord met de meest recente versie van deze kennisgeving.
          </p>
          <h3 className="text-2xl font-bold mb-2">Toepasselijk Recht en Geschillen</h3>
          <p className="text-lg mb-4">
            Deze wettelijke kennisgeving wordt beheerst door en geïnterpreteerd in overeenstemming met de wetten van het land waarin Tappass is gevestigd. Alle geschillen die voortvloeien uit het gebruik van de Tappass-website zullen worden voorgelegd aan de bevoegde rechtbanken in dat rechtsgebied.
          </p>
          <h3 className="text-2xl font-bold mb-2">Contactinformatie</h3>
          <p className="text-lg mb-4">
            Voor vragen over deze wettelijke kennisgeving of het gebruik van de website, neem dan contact met ons op via de contactgegevens die op onze website vermeld staan.
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
            <Link href="/terms" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Algemene voorwaarden</a></Link>
            <Link href="/cookies" legacyBehavior><a className="text-gray-600 hover:text-gray-800 transition">Cookie policy</a></Link>
          </div>
          <p className="text-gray-600">© 2023 Tappass. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
