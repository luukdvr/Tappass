"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correcte manier om params op te halen in Next.js 14+
import supabase from "../../../supabaseClient"; // Import Supabase client
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"; // Import icons
import Image from "next/image"; // Import Image component

export default function ProfilePage() {
  const [links, setLinks] = useState([]);
  const [bio, setBio] = useState(""); // Add state for bio
  const [name, setName] = useState(""); // Add state for name
  const [surname, setSurname] = useState(""); // Add state for surname
  const [address, setAddress] = useState(""); // Add state for address
  const [email, setEmail] = useState(""); // Add state for email
  const [phone, setPhone] = useState(""); // Add state for phone
  const [functionTitle, setFunctionTitle] = useState(""); // Add state for function title
  const [bgColor, setBgColor] = useState(""); // Add state for background color
  const [profileImage, setProfileImage] = useState(null); // Add state for profile image URL
  const [loading, setLoading] = useState(true);
  const params = useParams(); // Haal de route params op

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
        setBgColor(data.bgColor || ""); // Set background color from fetched data
        setProfileImage(data.profileimageurl || null); // Set profile image from fetched data
      } catch (error) {
        console.error("Fout bij het ophalen van profielgegevens:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: bgColor }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
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
              <h2 className="text-xl font-bold text-center text-gray-800">Contactinformatie</h2>
              <p className="text-gray-800 flex items-center justify-center"><FaMapMarkerAlt className="mr-2" /> {address}</p>
              <p className="text-gray-800 flex items-center justify-center"><FaEnvelope className="mr-2" /> {email}</p>
              <p className="text-gray-800 flex items-center justify-center"><FaPhone className="mr-2" /> {phone}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
