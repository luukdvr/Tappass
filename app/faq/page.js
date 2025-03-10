"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function FAQPage() {
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

      {/* FAQ Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">📌 Veelgestelde Vragen (FAQ) – Tappass</h2>
          <p className="text-lg mb-4">
            Welkom bij de FAQ-pagina van Tappass! Hier vind je antwoorden op de meest gestelde vragen over onze NFC-visitekaartjes en het online dashboard. Staat jouw vraag er niet tussen? Neem gerust contact met ons op!
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Wat is Tappass?</h3>
          <p className="text-lg mb-4">
            Tappass is een slim NFC-visitekaartje dat je eenvoudig tegen de telefoon van iemand anders houdt om direct jouw persoonlijke of zakelijke profiel te delen. Geen papieren kaartjes meer nodig – alles digitaal, altijd up-to-date.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Hoe werkt Tappass?</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Bestel jouw Tappass-kaart via onze website.</li>
            <li>Na aankoop ontvang je inloggegevens voor jouw eigen online dashboard.</li>
            <li>Via het dashboard maak je jouw persoonlijke profiel aan met links naar jouw socials, website, contactgegevens en meer.</li>
            <li>Houd je Tappass-kaart tegen een telefoon (met NFC) om jouw profiel meteen te delen.</li>
          </ul>
          <h3 className="text-2xl font-bold mb-2">❓ Welke telefoons ondersteunen NFC?</h3>
          <p className="text-lg mb-4">
            Vrijwel alle moderne smartphones ondersteunen NFC. Denk aan:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>iPhones vanaf de iPhone 7 (iOS 13 en hoger).</li>
            <li>De meeste Android-toestellen vanaf 2015.</li>
          </ul>
          <p className="text-lg mb-4">
            Twijfel je of jouw toestel werkt? Neem even contact op!
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Kan ik mijn profiel later aanpassen?</h3>
          <p className="text-lg mb-4">
            Ja! Via het online dashboard kun je altijd inloggen om jouw profiel aan te passen. Verander je profielfoto, bio, links en contactinformatie in real-time – jouw kaart werkt meteen met de nieuwste gegevens.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Kan ik meerdere profielen aanmaken?</h3>
          <p className="text-lg mb-4">
            Op dit moment is het aanmaken van één profiel per account mogelijk. We werken eraan om in de toekomst ondersteuning voor meerdere profielen toe te voegen.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Wat kost een Tappass-kaart?</h3>
          <p className="text-lg mb-4">
            De prijzen van onze kaarten vind je op onze website. Er zijn verschillende designs en materialen beschikbaar, zoals PVC, hout en metaal.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Is er een abonnement nodig?</h3>
          <p className="text-lg mb-4">
            Nee, jouw Tappass-kaart werkt zonder verplichte abonnementskosten. Eenmalige aanschaf, levenslang gebruik. Wil je toegang tot premium features? Dan bieden we optioneel een voordelig maandabonnement aan.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Wat als mijn kaart kwijt of kapot is?</h3>
          <p className="text-lg mb-4">
            Neem contact op met onze klantenservice. We bieden speciale vervangingskortingen voor bestaande klanten.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Kan ik Tappass gebruiken met mijn bedrijf?</h3>
          <p className="text-lg mb-4">
            Zeker! We bieden ook zakelijke oplossingen voor teams, inclusief gepersonaliseerde kaarten en een beheeromgeving voor meerdere medewerkers. Vraag een offerte aan via ons contactformulier.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Hoe snel wordt mijn kaart geleverd?</h3>
          <p className="text-lg mb-4">
            We versturen jouw Tappass-kaart binnen 2 werkdagen na bestelling. De levertijd hangt daarna af van de bezorgdienst, maar meestal heb je &apos;m binnen 3-5 werkdagen in huis.
          </p>
          <h3 className="text-2xl font-bold mb-2">❓ Hoe neem ik contact op met Tappass?</h3>
          <p className="text-lg mb-4">
            Heb je een vraag of wil je iets speciaals? We helpen je graag!
          </p>
          <p className="text-lg mb-4">
            📧 E-mail: info@tappass.nl<br />
            📱 Instagram DM: @tappass.nl
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
