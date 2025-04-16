"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "../supabaseClient"; // Import Supabase client
import "./styles/globals.css"; // Import global styles
import { useLanguage } from '../context/LanguageContext'; // Zorg ervoor dat een taalcontext wordt gebruikt

export default function HomePage() {
  const { t } = useLanguage(); // Gebruik de vertaalfunctie uit de context
  const [user, setUser] = useState(null);
  const [, setIsSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const router = useRouter();

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


  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleOrderNowClick = () => {
    if (user) {
      router.push("/design");
    } else {
      router.push("/auth/login?redirectedFrom=/design");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAccountPopup = () => {
    setAccountPopupOpen(!accountPopupOpen);
  };

  const handleDashboardClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login?redirectedFrom=/dashboard");
      return;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('is_subscribed')
      .eq('id', session.user.id)
      .single();

    if (userData?.is_subscribed) {
      router.push("/dashboard");
    } else {
      router.push("/design");
    }
  };

  const handleDesignClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login?redirectedFrom=/design");
      return;
    }
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
          {/* If user is logged in, show logout icon */}
          {user ? (
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Image src="/logout.png" alt="Logout" width={24} height={24} />
            </button>
          ) : (
            <>
              {/* Account Icon */}
              <button
                onClick={toggleAccountPopup}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <Image src="/account.png" alt="Account" width={24} height={24} />
              </button>
            </>
          )}
          {/* Burger Icon */}
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <Image src="/burger-bar.png" alt="Menu" width={30} height={30} />
          </button>
        </div>
      </header>

      {/* Popup Menu */}
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDashboardClick();
              }}
              style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDesignClick();
              }}
              style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}
            >
              Pas ontwerpen
            </a>
            <a href="/faq" style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>FAQ</a>
            <a href="/pricing" style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Prijzen</a>
            <a href="/contact" style={{ textDecoration: 'none', fontSize: '18px', color: '#000' }}>Contact</a>
          </nav>
        </div>
      )}

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
          {user ? (
            <>
              <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700 transition">{t.logout}</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700 transition">{t.login}</a>
              </Link>
              <Link href="/auth/register" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700 transition">{t.register}</a>
              </Link>
            </>
          )}
          </nav>
        </div>
      )}

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
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Updated to max-w-3xl */}
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
          <button onClick={handleOrderNowClick} className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition mt-8 inline-block">
            Bestel nu
          </button>
        </div>
      </div>

      {/* Ontmoet Tappass */}
      <div className="bg-gray-100 py-12"> {/* Set background to very light gray */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Ontmoet Tappass</h2>
          <p className="text-lg mb-8">
            Tappass is jouw digitale visitekaartje voor de moderne tijd. Met één simpele tap deel je al je professionele informatie, contactgegevens en social media. Geen gedoe meer met papieren kaartjes die kwijtraken of verouderen.
          </p>
          <video
            src="/Tappass uitleg video.mp4"
            controls
            className="mx-auto rounded-2xl shadow-lg"
            style={{ maxWidth: '30%', height: 'auto' }}
          />
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Updated to max-w-3xl */}
          <h2 className="text-3xl font-bold mb-4">Hoe werkt Tappass?</h2>
          <p className="text-lg mb-8">
            Tappass is eenvoudig te gebruiken. Scan de QR-code en krijg direct toegang tot alle contactgegevens.
          </p>
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
          <button onClick={handleOrderNowClick} className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition mt-8 inline-block">
            Bestel nu
          </button>
        </div>
      </div>

      {/* Binnen 10 minuten sectie */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Binnen 10 minuten klaar!</h2>
          <p className="text-lg mb-8">
            Vraag je pas aan, ontwerp hem en personaliseer je linkpagina in minder dan 10 minuten. Zo kun je direct beginnen met netwerken!
          </p>
        </div>
      </div>

      {/* Serieuze netwerkers sectie */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Voor serieuze netwerkers</h2>
          <p className="text-lg mb-8">
            Tappass is niet voor iedereen. Het is speciaal ontworpen voor mensen die serieus zijn over hun netwerk en een blijvende indruk willen maken. Ben jij klaar om je netwerk naar een hoger niveau te tillen?
          </p>
          <button
            onClick={() => router.push("/design")}
            className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition"
          >
            Begin nu
          </button>
        </div>
      </div>

      {/* Ontwerp je eigen Tappass */}
      <div className="py-12 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-center px-4"> {/* Centered content */}
          <h2 className="text-3xl font-bold mb-4">Ontwerp je eigen Tappass</h2>
          <p className="text-lg mb-8">
            Maak je Tappass uniek! Kies je eigen stijl, voeg je logo toe, en personaliseer je digitale visitekaartje zoals jij dat wilt. Laat je creativiteit de vrije loop en maak een blijvende indruk.
          </p>
          <Image
            src="/__JZbmcmRLOKMdmuYbiang.webp" // Placeholder image, replace with your own
            alt="Ontwerp je eigen Tappass"
            width={600}
            height={400}
            className="mx-auto rounded-2xl shadow-lg mb-8"
          />
          <button
            onClick={() => router.push("/design")}
            className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition"
          >
            Begin met ontwerpen
          </button>
        </div>
      </div>

      {/* Verschil tussen normale visitekaartjes en Tappass */}
      <div className="py-12 bg-gray-100"> {/* Set background to very light gray */}
        <div className="max-w-3xl mx-auto px-4"> {/* Updated to max-w-3xl */}
          <h2 className="text-3xl font-bold text-center mb-8">Waarom overstappen naar Tappass?</h2>
          <div className="flex flex-col md:flex-row gap-8"> {/* Changed to flex layout */}
            {/* Oude visitekaartjes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-1"> {/* Added flex-1 for equal width */}
              <h3 className="text-2xl font-bold mb-4 text-black">Oude visitekaartjes</h3>
              <ul className="list-none space-y-4">
                <li className="flex items-center text-gray-600">
                  <Image src="/x-mark.png" alt="Minpunt" width={24} height={24} className="mr-2" />
                  Altijd meenemen, raken kwijt of beschadigen snel.
                </li>
                <li className="flex items-center text-gray-600">
                  <Image src="/x-mark.png" alt="Minpunt" width={24} height={24} className="mr-2" />
                  Niemand bewaart ze, netwerk gaat snel verloren.
                </li>
                <li className="flex items-center text-gray-600">
                  <Image src="/x-mark.png" alt="Minpunt" width={24} height={24} className="mr-2" />
                  Beperkte ruimte, geen makkelijke toegang tot links.
                </li>
              </ul>
            </div>
            {/* Tappass */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-1"> {/* Added flex-1 for equal width */}
              <h3 className="text-2xl font-bold mb-4 text-black">Tappass</h3>
              <ul className="list-none space-y-4">
                <li className="flex items-center text-gray-600">
                  <Image src="/check-mark.png" alt="Voordeel" width={24} height={24} className="mr-2" />
                  Stevige kaart, altijd bij je, raakt niet kwijt.
                </li>
                <li className="flex items-center text-gray-600">
                  <Image src="/check-mark.png" alt="Voordeel" width={24} height={24} className="mr-2" />
                  Contact blijft behouden, netwerk blijft intact.
                </li>
                <li className="flex items-center text-gray-600">
                  <Image src="/check-mark.png" alt="Voordeel" width={24} height={24} className="mr-2" />
                  Onbeperkte informatie, snelle toegang tot links.
                </li>
              </ul>
            </div>
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

      {/* Tappass Prijs en Features */}
      <div className="py-12 bg-gray-100 flex justify-center items-center"> {/* Center content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl text-center"> {/* White card container */}
          <h2 className="text-3xl font-bold mb-4">Tappass voor slechts €5 per maand</h2>
          <p className="text-lg mb-8">
            Voor slechts €5 per maand krijg je toegang tot alle premium functies van Tappass. Ontdek wat je allemaal krijgt:
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-4"> {/* Features list */}
            <li>Onbeperkt delen van je digitale visitekaartje.</li>
            <li>Volledig aanpasbaar ontwerp voor jouw Tappass.</li>
            <li>Toegang tot uitgebreide netwerkstatistieken.</li>
            <li>Integratie met sociale media en professionele platforms.</li>
            <li>24/7 klantenondersteuning voor al je vragen.</li>
            <li>Veilige opslag van je contactgegevens in de cloud.</li>
            <li>Regelmatige updates met nieuwe functies.</li>
          </ul>
          <button
            onClick={() => router.push("/pricing")}
            className="bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition mt-8"
          >
            Bekijk abonnementen
          </button>
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
