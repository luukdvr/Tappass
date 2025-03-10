"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correcte manier om params op te halen in Next.js 14+
import supabase from "../../../supabaseClient"; // Import Supabase client
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPlus } from "react-icons/fa"; // Import icons
import Image from "next/image"; // Import Image component
import { useLanguage } from "../../../context/LanguageContext"; // Import Language context
import "../../styles/globals.css"; // Correct import path for global styles

const translations = {
  nl: {
    createTappass: "Maak uw tappass",
  },
  en: {
    createTappass: "Create your tappass",
  },
};

export default function ProfilePage() {
  const [links, setLinks] = useState([]);
  const [bio, setBio] = useState(""); // Add state for bio
  const [name, setName] = useState(""); // Add state for name
  const [surname, setSurname] = useState(""); // Add state for surname
  const [address, setAddress] = useState(""); // Add state for address
  const [email, setEmail] = useState(""); // Add state for email
  const [phone, setPhone] = useState(""); // Add state for phone
  const [functionTitle, setFunctionTitle] = useState(""); // Add state for function title
  const [profileImage, setProfileImage] = useState(null); // Add state for profile image URL
  const [loading, setLoading] = useState(true);
  const params = useParams(); // Haal de route params op
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!params || !params.id) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", params.id)
          .single();
        if (error) throw error;
        setLinks(data.links || []);
        setBio(data.bio || ""); // Set bio from fetched data
        setName(data.name || ""); // Set name from fetched data
        setSurname(data.surname || ""); // Set surname from fetched data
        setAddress(data.address || ""); // Set address from fetched data
        setEmail(data.email || ""); // Set email from fetched data
        setPhone(data.phone || ""); // Set phone from fetched data
        setFunctionTitle(data.functionTitle || ""); // Set function title from fetched data
        setProfileImage(data.profileimageurl || null); // Set profile image from fetched data
      } catch (error) {
        console.error("Fout bij het ophalen van profielgegevens:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [params]);

  const handleAddToContacts = () => {
    const contact = {
      name: `${name} ${surname}`,
      email: email,
      phone: phone,
      address: address,
      note: bio,
    };

    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
EMAIL:${contact.email}
TEL:${contact.phone}
ADR:${contact.address}
NOTE:${contact.note}
END:VCARD
    `;

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contact.name}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bekijk mijn profiel op Tappass',
          text: 'Bekijk mijn profiel op Tappass',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Delen is niet ondersteund op dit apparaat.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <Image
        src="/blue-bg.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative z-10">
        <button
          onClick={handleShare}
          className="absolute top-4 right-4"
        >
          <Image
            src="/share.png"
            alt="Deel Profiel"
            width={24}
            height={24}
          />
        </button>
        {loading ? (
          <p className="text-gray-600">Laden...</p>
        ) : (
          <>
            {profileImage && (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500">
                <Image 
                  src={profileImage} 
                  alt="Profielfoto" 
                  width={96} 
                  height={96} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">{name} {surname}</h1>
            {functionTitle && (
              <p className="text-center text-gray-600 mb-4">{functionTitle}</p>
            )}
            {bio && (
              <div className="w-full max-w-md mb-4">
                <p className="text-center text-gray-800">{bio}</p>
              </div>
            )}
            {links.length > 0 ? (
              <div className="w-full max-w-md space-y-4">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url.startsWith("http") ? link.url : `https://${link.url}`} // Forceer https:// als het ontbreekt
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Geen links beschikbaar</p>
            )}
            <div className="w-full max-w-md mt-6 space-y-2 text-center">
              <h2 className="text-xl font-bold text-center text-gray-800">Contact</h2>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 flex items-center justify-center hover:underline"
              >
                <FaMapMarkerAlt className="mr-2" /> {address}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-gray-800 flex items-center justify-center hover:underline"
              >
                <FaEnvelope className="mr-2" /> {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="text-gray-800 flex items-center justify-center hover:underline"
              >
                <FaPhone className="mr-2" /> {phone}
              </a>
              <button
                onClick={handleAddToContacts}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition flex items-center justify-center mx-auto"
              >
                <FaPlus className="mr-2" /> Voeg toe aan contacten
              </button>
            </div>
          </>
        )}
      </div>
      <div className="text-center mt-4 relative z-10">
        <a
          href="https://tappass.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          {t.createTappass.split(" ").map((word, index) => (
            word === "tappass" ? <span key={index} className="underline">{word}</span> : <span key={index}>{word} </span>
          ))}
        </a>
      </div>
    </div>
  );
}
