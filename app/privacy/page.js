"use client";

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css"; // Import global styles

export default function PrivacyPage() {
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

      {/* Privacy Policy */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white"> {/* Set background to white */}
        <div className="max-w-3xl mx-auto text-left px-4"> {/* Reduce max width and add padding */}
          <h2 className="text-3xl font-bold mb-4">Privacybeleid</h2>
          <p className="text-lg mb-4">Laatst bijgewerkt: 17 december 2024</p>
          <p className="text-lg mb-4">
            In dit Privacybeleid wordt beschreven hoe Tappass (de &apos;Site&apos;, &apos;wij&apos;, &apos;ons&apos; of &apos;onze&apos;) jouw persoonlijke gegevens verzamelt, gebruikt en doorgeeft wanneer je onze services bezoekt, gebruikt of een aankoop doet bij tappass.nl (de &apos;Site&apos;) of op een andere manier met ons communiceert over de Site (gezamenlijk de &apos;Services&apos;). Voor het doel van dit Privacybeleid verwijzen &apos;je&apos; en &apos;jou(w)&apos; naar jou als gebruiker van de Services, of je nu een klant, websitebezoeker of een andere persoon bent van wie we informatie hebben verzameld op grond van dit Privacybeleid.
          </p>
          <p className="text-lg mb-4">Lees dit Privacybeleid aandachtig door.</p>
          <h3 className="text-2xl font-bold mb-2">Wijzigingen in dit Privacybeleid</h3>
          <p className="text-lg mb-4">
            We kunnen dit Privacybeleid van tijd tot tijd bijwerken, onder meer om wijzigingen in onze werkwijzen weer te geven of om andere operationele, juridische of regelgevende redenen. We plaatsen het bijgewerkte Privacybeleid op de Site, passen de datum bij &apos;Laatst bijgewerkt&apos; aan en ondernemen alle andere stappen die vereist zijn door de toepasselijke wetgeving.
          </p>
          <h3 className="text-2xl font-bold mb-2">Hoe wij je persoonlijke gegevens verzamelen en gebruiken</h3>
          <p className="text-lg mb-4">
            Om de Services te kunnen leveren, verzamelen wij persoonlijke informatie over jou uit verschillende bronnen, zoals hieronder uiteengezet. De informatie die we verzamelen en gebruiken, is afhankelijk van je interacties met ons.
          </p>
          <p className="text-lg mb-4">
            Naast het specifieke gebruik dat hieronder uiteen wordt gezet, kunnen we de informatie die we over jou verzamelen gebruiken om met je te communiceren, de Services te leveren of te verbeteren, te voldoen aan alle toepasselijke wettelijke verplichtingen, toepasselijke servicevoorwaarden af te dwingen, en om de Services, onze rechten en de rechten van onze gebruikers of anderen te beschermen of te verdedigen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Welke persoonlijke gegevens we verzamelen</h3>
          <p className="text-lg mb-4">
            Welke soort persoonlijke gegevens we over jou verkrijgen, is afhankelijk van je interacties met onze Site en je gebruik van onze Services. Wanneer we de term &apos;persoonlijke gegevens&apos; gebruiken, bedoelen we gegevens die jou identificeren, betrekking op je hebben of je beschrijven of die met jou in verband kunnen worden gebracht. In de volgende secties worden de categorieën en specifieke soorten persoonlijke gegevens beschreven die we verzamelen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Informatie die we rechtstreeks van jou verzamelen</h3>
          <p className="text-lg mb-4">
            Informatie die je rechtstreeks via onze Services aan ons verstrekt, kan het volgende omvatten:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Contactgegevens inclusief je naam, adres, telefoonnummer en e-mailadres.</li>
            <li>Bestelgegevens inclusief je naam, factuuradres, bezorgadres, betalingsbevestiging, e-mailadres en telefoonnummer.</li>
            <li>Accountgegevens inclusief je gebruikersnaam, wachtwoord, beveiligingsvragen en andere informatie die wordt gebruikt voor accountbeveiliging.</li>
            <li>Informatie over klantenondersteuning inclusief de informatie die wilt opnemen in de communicatie met ons, bijvoorbeeld wanneer je een bericht verzendt via de Services.</li>
          </ul>
          <p className="text-lg mb-4">
            Voor sommige functies van de Services kan het nodig zijn dat je ons rechtstreeks bepaalde informatie over jezelf verstrekt. Je kunt ervoor kiezen deze informatie niet te verstrekken, maar in dat geval kun je deze functies mogelijk niet gebruiken of openen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Informatie die we verzamelen over je gebruik</h3>
          <p className="text-lg mb-4">
            We kunnen ook automatisch bepaalde informatie verzamelen over je interactie met de Services (&apos;Gebruiksgegevens&apos;). Hiervoor kunnen we cookies, pixels en soortgelijke technologieën gebruiken (&apos;Cookies&apos;). Gebruiksgegevens kunnen informatie bevatten over hoe je onze Site en je account bezoekt en gebruikt, inclusief apparaatinformatie, browserinformatie, informatie over je netwerkverbinding, je IP-adres en andere informatie over je interactie met de Services.
          </p>
          <h3 className="text-2xl font-bold mb-2">Informatie die we verkrijgen van derden</h3>
          <p className="text-lg mb-4">
            Ten slotte kunnen we informatie over jou verkrijgen van derden, inclusief van verkopers en serviceproviders die namens ons informatie kunnen verzamelen, zoals:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Bedrijven die onze Site en Services ondersteunen.</li>
            <li>Onze betalingsverwerkers, die betalingsgegevens verzamelen (bijvoorbeeld bankrekening-, creditcard- of debitkaartgegevens, factuuradres) om je betaling te verwerken, je bestellingen uit te voeren en de door jou gevraagde producten of services te leveren, zodat we de overeenkomst die we met je hebben, kunnen uitvoeren.</li>
            <li>Wanneer je onze Site bezoekt, e-mails die we je sturen opent of erop klikt, of interactie hebt met onze Services of advertenties, kunnen wij, of derden waarmee we samenwerken, automatisch bepaalde informatie verzamelen met behulp van technologieën voor online tracking, zoals pixels, webbeacons, softwareontwikkelaarkits, bibliotheken van derden en cookies.</li>
          </ul>
          <p className="text-lg mb-4">
            Alle informatie die wij van derden verkrijgen, wordt behandeld in overeenstemming met dit Privacybeleid. Zie ook de onderstaande sectie, Websites en links van derden.
          </p>
          <h3 className="text-2xl font-bold mb-2">Hoe wij je persoonlijke gegevens gebruiken</h3>
          <p className="text-lg mb-4">
            Levering van producten en services. We gebruiken je persoonlijke gegevens om je de Services te verlenen volgens de overeenkomst die we met je hebben, met inbegrip van het verwerken van je betalingen, het uitvoeren van je bestellingen, het verzenden van meldingen met betrekking tot je account, aankopen, retourzendingen, omruilingen of andere transacties, het aanmaken, onderhouden en anderszins beheren van je account, het regelen van de verzending, het faciliteren van retourzendingen en omruilingen en andere functies en functionaliteiten met betrekking tot je account. We kunnen je shoppingervaring ook verbeteren door Shopify in staat te stellen je account te matchen met andere Shopify-services die je misschien zou willen gebruiken. In dit geval verwerkt Shopify je gegevens zoals uiteengezet in het Privacybeleid en het Privacybeleid voor Consumenten.
          </p>
          <p className="text-lg mb-4">
            Marketing en reclame. We kunnen je persoonlijke gegevens gebruiken voor marketing- en promotiedoeleinden, zoals het verzenden van marketing-, reclame- en promotionele communicatie per e-mail, sms of post, en om je advertenties voor producten of services te tonen. Dit kan betekenen dat je persoonlijke gegevens worden gebruikt om de Services en advertenties op onze Site en andere websites beter af te stemmen. Als je een inwoner van de EER bent, is de wettelijke basis voor deze gegevensverwerkingsactiviteiten ons legitieme belang bij de verkoop van onze producten, volgens Art. 6 (1) (f) AVG.
          </p>
          <p className="text-lg mb-4">
            Beveiliging en fraudepreventie. We gebruiken je persoonlijke gegevens om mogelijke frauduleuze, illegale of kwaadwillige activiteiten op te sporen, te onderzoeken of er actie op te ondernemen. Als je ervoor kiest om de Services te gebruiken en een account te registreren, bent je zelf verantwoordelijk voor het veilig bewaren van de inloggegevens van je account. Wij raden je ten zeerste aan om je gebruikersnaam, wachtwoord en andere toegangsgegevens met niemand anders te delen. Als je denkt dat je account is gehackt, neem dan onmiddellijk contact met ons op. Als je een inwoner van de EER bent, is de wettelijke basis voor deze gegevensverwerkingsactiviteiten ons legitieme belang om onze website veilig te houden voor jou en andere klanten, volgens Art. 6 (1) (f) AVG.
          </p>
          <p className="text-lg mb-4">
            Communicatie en serviceverbetering. Wij gebruiken je persoonlijke gegevens om je klantenondersteuning te bieden en onze Services te verbeteren. Dit is in ons legitieme belang om op met jou te communiceren, je effectieve services te verlenen en onze zakelijke relatie met jou te onderhouden volgens Art. 6 (1) (f) AVG.
          </p>
          <h3 className="text-2xl font-bold mb-2">Cookies</h3>
          <p className="text-lg mb-4">
            Net als veel andere websites gebruiken wij cookies op onze Site. Specifieke informatie over de cookies die we gebruiken met betrekking tot het ondersteunen van onze winkel. We gebruiken Cookies om onze Site en onze Services te ondersteunen en te verbeteren (inclusief om jouw acties en voorkeuren te onthouden), om analyses uit te voeren en meer inzicht te krijgen in de gebruikersinteractie met de Services (in ons legitieme belang om de Services te beheren, te verbeteren en te optimaliseren). We kunnen ook derden en serviceproviders toestaan om cookies op onze Site te gebruiken om de services, producten en reclame op onze Site en andere websites beter af te stemmen.
          </p>
          <p className="text-lg mb-4">
            De meeste browsers accepteren Cookies standaard automatisch, maar je kunt in de browserinstellingen je browser zo instellen dat cookies worden verwijderd of geweigerd. Houd er rekening mee dat het verwijderen of blokkeren van cookies een negatieve invloed kan hebben op je gebruikerservaring en ertoe kan leiden dat sommige Services, inclusief bepaalde functies en algemene functionaliteit, niet correct werken of niet langer beschikbaar zijn. Bovendien verhindert het blokkeren van Cookies mogelijk niet volledig de manier waarop we informatie delen met derden, zoals onze advertentiepartners.
          </p>
          <h3 className="text-2xl font-bold mb-2">Hoe we persoonlijke gegevens bekendmaken</h3>
          <p className="text-lg mb-4">
            In bepaalde omstandigheden kunnen we je persoonlijke gegevens aan derden bekendmaken voor contractuitvoering, legitieme doeleinden en andere redenen die vallen onder dit Privacybeleid. Dergelijke omstandigheden kunnen zijn:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Met leveranciers of andere derden die namens ons services uitvoeren (bijvoorbeeld IT-beheer, betalingsverwerking, gegevensanalyse, klantenondersteuning, cloudopslag, afhandeling en verzending).</li>
            <li>Met zakelijke en marketingpartners om services te bieden en advertenties aan jou te tonen. Onze zakelijke en marketingpartners zullen jouw gegevens gebruiken in overeenstemming met hun eigen privacyverklaringen.</li>
            <li>Wanneer je ons opdracht geeft, ons verzoekt of op andere manier toestemming geeft om bepaalde gegevens door te geven aan derden, bijvoorbeeld om jou producten te leveren of via jouw gebruik van sociale media-widgets of inlogintegraties, met jouw toestemming.</li>
            <li>Met onze affiliates of anderszins binnen onze bedrijvengroep, in onze legitieme belangen om een succesvol bedrijf te runnen.</li>
            <li>In verband met een zakelijke transactie, zoals een fusie of een faillissement, om te voldoen aan toepasselijke wettelijke verplichtingen (waaronder het reageren op dagvaardingen, huiszoekingsbevelen en soortgelijke verzoeken), om toepasselijke servicevoorwaarden af te dwingen en om de Services, onze rechten en de rechten van onze gebruikers of anderen te beschermen of te verdedigen.</li>
          </ul>
          <p className="text-lg mb-4">
            We maken openbaar de volgende categorieën persoonlijke gegevens en gevoelige persoonlijke gegevens over gebruikers voor de doelen zoals hiervoor uiteengezet in &apos;Hoe we je persoonlijke gegevens verzamelen en gebruiken&apos; en &apos;Hoe we persoonlijke gegevens openbaar maken&apos;
          </p>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Categorie</th>
                <th className="px-4 py-2">Categorieën ontvangers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Identificatiegegevens zoals basiscontactgegevens en bepaalde bestel- en accountinformatie</td>
                <td className="border px-4 py-2">Leveranciers en derden die namens ons diensten verlenen (zoals internetproviders, betalingsverwerkers, fulfilmentpartners, klantenondersteuningspartners en aanbieders van data-analyse)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Commerciële informatie zoals informatie over bestellingen, shopping en klantenondersteuning</td>
                <td className="border px-4 py-2">Zakelijke en marketingpartners</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Internet of andere soortgelijke netwerkactiviteit, zoals gebruiksgegevens</td>
                <td className="border px-4 py-2">Affiliates</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Geolocatiegegevens zoals locaties bepaald door een IP-adres of andere technische maatregelen</td>
                <td className="border px-4 py-2">Wij gebruiken of openbaren geen gevoelige persoonlijke gegevens zonder jouw toestemming of met als doel kenmerken over jou af te leiden.</td>
              </tr>
            </tbody>
          </table>
          <p className="text-lg mb-4">
            Met jouw toestemming delen wij als volgt persoonlijke gegevens om reclame- en marketingactiviteiten uit te voeren.
          </p>
          <h3 className="text-2xl font-bold mb-2">Websites en links van derden</h3>
          <p className="text-lg mb-4">
            Onze Site kan links bevatten naar websites of andere online platforms die door derden worden beheerd. Als je links volgt naar sites die niet bij ons zijn aangesloten of niet door ons worden beheerd, is het belangrijk dat je hun privacy- en beveiligingsbeleid en andere voorwaarden leest. Wij geven geen garantie en zijn niet verantwoordelijk voor de privacy of veiligheid van dergelijke sites, inclusief de nauwkeurigheid, volledigheid of betrouwbaarheid van de informatie op deze sites. Informatie die je verstrekt op openbare of semi-openbare locaties, inclusief informatie die je deelt op sociale netwerken van derden, kan ook zichtbaar zijn voor andere gebruikers van de Services en/of gebruikers van deze platforms van derden, zonder beperking wat betreft het gebruik ervan door ons of door een derde. De opname van dergelijke links op onze Site impliceert op zich geen goedkeuring van de content op dergelijke platforms of van hun eigenaars of exploitanten, behalve zoals vermeld in de Services.
          </p>
          <h3 className="text-2xl font-bold mb-2">Gegevens van kinderen</h3>
          <p className="text-lg mb-4">
            De Services zijn niet bedoeld voor gebruik door kinderen en wij verzamelen niet bewust persoonlijke gegevens over kinderen. Als je de ouder of voogd bent van een kind dat ons persoonlijke gegevens heeft verstrekt, kun je contact met ons opnemen via de onderstaande contactinformatie om te verzoeken dat deze worden verwijderd.
          </p>
          <p className="text-lg mb-4">
            Vanaf de ingangsdatum van dit Privacybeleid is het ons niet daadwerkelijk bekend dat we persoonlijke gegevens van personen jonger dan 16 jaar &apos;delen&apos; of &apos;verkopen&apos; (zoals deze termen worden gedefinieerd in de toepasselijke wetgeving).
          </p>
          <h3 className="text-2xl font-bold mb-2">Beveiliging en bewaring van je gegevens</h3>
          <p className="text-lg mb-4">
            Houd er rekening mee dat geen enkele beveiligingsmaatregel perfect of ondoordringbaar is en dat we geen &apos;perfecte beveiliging&apos; kunnen garanderen. Bovendien is het mogelijk dat gegevens die je ons stuurt, tijdens verzending niet veilig is. We raden je aan geen onveilige kanalen te gebruiken om gevoelige of vertrouwelijke informatie naar ons te communiceren.
          </p>
          <p className="text-lg mb-4">
            Hoelang we je persoonlijke gegevens bewaren, hangt af van verschillende factoren, zoals of we de gegevens nodig hebben om je account te onderhouden, om de Services te leveren, om te voldoen aan wettelijke verplichtingen, om geschillen op te lossen of om aan andere geldende contracten en beleidsregels te voldoen.
          </p>
          <h3 className="text-2xl font-bold mb-2">Jouw rechten</h3>
          <p className="text-lg mb-4">
            Afhankelijk van waar je woont, kun je enkele of alle van de onderstaande rechten hebben met betrekking tot je persoonlijke gegevens. Deze rechten zijn echter niet absoluut en kunnen alleen onder bepaalde omstandigheden van toepassing zijn, en in bepaalde gevallen kunnen wij je verzoek afwijzen, voor zover wettelijk toegestaan.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Toegang: Je kunt het recht hebben om toegang te vragen tot de persoonlijke gegevens die we over jou bewaren, inclusief informatie over hoe we deze gebruiken en met wie we deze delen.</li>
            <li>Correctie: Je kunt het recht hebben om ons te vragen om onjuiste persoonlijke gegevens die we over jou bewaren, te corrigeren of bij te werken.</li>
            <li>Verwijdering: Je kunt het recht hebben om ons te vragen je persoonlijke gegevens te verwijderen.</li>
            <li>Beperking: Je kunt het recht hebben om ons te vragen de verwerking van je persoonlijke gegevens te beperken.</li>
            <li>Bezwaar: Je kunt het recht hebben om bezwaar te maken tegen de verwerking van je persoonlijke gegevens op basis van legitieme belangen.</li>
            <li>Overdraagbaarheid: Je kunt het recht hebben om een kopie van je persoonlijke gegevens in een gestructureerd, algemeen gebruikt en machineleesbaar formaat te ontvangen en deze naar een andere verwerkingsverantwoordelijke te laten overdragen.</li>
            <li>Intrekken van toestemming: Als we je persoonlijke gegevens verwerken op basis van je toestemming, heb je het recht om je toestemming op elk moment in te trekken.</li>
          </ul>
          <p className="text-lg mb-4">
            Om een van deze rechten uit te oefenen, kun je contact met ons opnemen via de onderstaande contactinformatie. We zullen je verzoeken beoordelen en erop reageren in overeenstemming met de toepasselijke wetgeving.
          </p>
          <h3 className="text-2xl font-bold mb-2">Contact</h3>
          <p className="text-lg mb-4">
            Als je vragen of opmerkingen hebt over dit Privacybeleid, of als je een van je rechten wilt uitoefenen, kun je contact met ons opnemen via:
          </p>
          <p className="text-lg mb-4">
            Tappass<br />
            E-mail: privacy@tappass.nl<br />
          </p>
        </div>
      </div>
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
          <p className="text-gray-600">© 2024 Tappass. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
