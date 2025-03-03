"use client"; // Zorgt ervoor dat deze code alleen in de browser draait

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../supabaseClient"; // Import Supabase client
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image"; // Import Image component

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [bio, setBio] = useState(""); // Add state for bio
  const [name, setName] = useState(""); // Add state for name
  const [surname, setSurname] = useState(""); // Add state for surname
  const [address, setAddress] = useState(""); // Add state for address
  const [email, setEmail] = useState(""); // Add state for email
  const [phone, setPhone] = useState(""); // Add state for phone
  const [functionTitle, setFunctionTitle] = useState(""); // Add state for function title
  const [bgColor, setBgColor] = useState(""); // Add state for background color
  const [profileImage, setProfileImage] = useState(null); // Add state for profile image URL
  const [uploading, setUploading] = useState(false); // Add state for upload status
  const [showLinkModal, setShowLinkModal] = useState(false); // State for link modal
  const [showProfileModal, setShowProfileModal] = useState(false); // State for profile modal
  const [showBgColorModal, setShowBgColorModal] = useState(false); // State for background color modal
  const [showBioModal, setShowBioModal] = useState(false); // State for bio modal
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const [error, setError] = useState(null); // State for error
  const router = useRouter();
  const [user, setUser] = useState(null); // State for user

  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setError("Fout bij het ophalen van gebruikersgegevens. Probeer het later opnieuw.");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  // Laad de profielgegevens van Supabase
  const loadProfile = useCallback(async () => {
    if (user) {
      try {
        console.log("Fetching profile for user ID:", user.id); // Debugging information
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error("Error loading profile:", error);
          setError(`Fout bij het laden van profielgegevens: ${error.message}`);
          return;
        }
        console.log("Profile data:", data); // Debugging information
        setLinks(data.links || []);
        setBio(data.bio || ""); // Set bio from fetched data
        setName(data.name || ""); // Set name from fetched data
        setSurname(data.surname || ""); // Set surname from fetched data
        setAddress(data.address || ""); // Set address from fetched data
        setEmail(data.email || ""); // Set email from fetched data
        setPhone(data.phone || ""); // Set phone from fetched data
        setFunctionTitle(data.functionTitle || ""); // Set function title from fetched data
        setBgColor(data.bgColor || ""); // Set background color from fetched data
        setProfileImage(data.profile_image || null); // Set profile image from fetched data
      } catch (err) {
        console.error("Error loading profile:", err);
        setError(`Fout bij het laden van profielgegevens: ${err.message}`);
      }
    }
  }, [user]);

  // Controleer of de gebruiker is ingelogd
  useEffect(() => {
    if (user === null) {
      // Wait for user state to be determined
      return;
    }
    if (!user) {
      router.push("/auth/login");
    } else {
      loadProfile();
    }
  }, [user, router, loadProfile]);

  // Voeg een nieuwe link toe
  const handleAddLink = async () => {
    if (!newLink.trim()) return;

    const updatedLinks = [...links, { title: newLink, url: newLink }];
    setLinks(updatedLinks);
    setNewLink("");
    setShowLinkModal(false);

    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ links: updatedLinks })
          .eq("id", user.id);
        if (error) throw error;
      } catch (err) {
        console.error("Error adding link:", err);
        setError(`Fout bij het toevoegen van de link: ${err.message}`);
      }
    }
  };

  // Verwijder een link
  const handleDeleteLink = async (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);

    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ links: updatedLinks })
          .eq("id", user.id);
        if (error) throw error;
      } catch (err) {
        console.error("Error deleting link:", err);
        setError(`Fout bij het verwijderen van de link: ${err.message}`);
      }
    }
  };

  // Drag & Drop functionaliteit om links te herschikken
  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Geen actie als de positie niet verandert

    const reorderedLinks = Array.from(links);
    const [movedItem] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedItem);

    setLinks(reorderedLinks);

    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ links: reorderedLinks })
          .eq("id", user.id);
        if (error) throw error;
      } catch (err) {
        console.error("Error reordering links:", err);
        setError(`Fout bij het herschikken van de links: ${err.message}`);
      }
    }
  };

  // Nieuwe functie voor het uploaden van een profielfoto
  const uploadProfileImage = async (event) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        setError("Je moet een bestand selecteren");
        setUploading(false);
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      // Verwijder de oude profielfoto uit de Supabase storage bucket
      if (profileImage) {
        const oldFilePath = profileImage.split('/').pop();
        await supabase.storage
          .from('avatars')
          .remove([oldFilePath]);
      }

      // Upload het nieuwe bestand naar de Supabase storage bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Genereer een publieke URL voor het nieuwe bestand
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Werk de gebruiker bij met de nieuwe profielfoto URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ profileimageurl: publicUrl }) // Correct column name
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Werk de lokale state bij
      setProfileImage(publicUrl);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(`Fout bij het uploaden van de afbeelding: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Update bio and other profile information
  const handleSaveProfile = async () => {
    if (user) {
      const userData = {
        bio,
        name,
        surname,
        address,
        email,
        phone,
        functionTitle,
        bgColor,
      };
      try {
        const { error } = await supabase
          .from("users")
          .update(userData)
          .eq("id", user.id);
        if (error) throw error;
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
        setShowProfileModal(false);
        setShowBgColorModal(false);
        setShowBioModal(false);
      } catch (err) {
        console.error("Error saving profile:", err);
        setError(`Fout bij het opslaan van profielgegevens: ${err.message}`);
      }
    }
  };

  // Uitloggen
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/auth/login");
    } catch (err) {
      console.error("Error logging out:", err);
      setError(`Fout bij het uitloggen: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo%20tappass.png" alt="Tappass Logo" className="h-16 mb-4" width={256} height={256} />
          
          {/* Profielfoto upload sectie */}
          <div className="w-24 h-24 relative mb-4">
            {profileImage ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                <Image 
                  src={profileImage} 
                  alt="Profielfoto" 
                  width={96} 
                  height={96} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-500">
                <span className="text-4xl text-gray-400">
                  {name && surname ? `${name.charAt(0)}${surname.charAt(0)}` : '?'}
                </span>
              </div>
            )}
            
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadProfileImage}
                disabled={uploading}
              />
            </label>
          </div>
          
          {uploading && <p className="text-blue-500 text-sm mb-2">Uploaden...</p>}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Bio knop */}
        <button
          onClick={() => setShowBioModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Bio Bewerken
        </button>

        {/* Profielinformatie knop */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Contactinformatie Bewerken
        </button>

        {/* Achtergrondkleur knop */}
        <button
          onClick={() => setShowBgColorModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Achtergrondkleur Wijzigen
        </button>

        {/* Lijst met links */}
        <h3 className="text-lg font-bold mt-6 text-gray-700">Jouw Links</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 mt-2">
                {links.map((link, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                          {link.title}
                        </a>
                        <button
                          onClick={() => handleDeleteLink(index)}
                          className="text-red-500 text-sm"
                        >
                          Verwijderen
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {/* Link toevoegen knop */}
        <button
          onClick={() => setShowLinkModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Link Toevoegen
        </button>

        {/* Knop naar profielpagina */}
        <div className="text-center mt-4">
          <a
            href={`/profile/${user?.id}`}
            className="bg-blue-500 text-white py-2 px-4 rounded text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bekijk jouw profielpagina
          </a>
        </div>

        {/* Uitlogknop */}
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded mt-4">
          Uitloggen
        </button>
      </div>

      {/* Link toevoegen modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nieuwe Link Toevoegen</h2>
            <input
              type="text"
              placeholder="Nieuwe link toevoegen"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleAddLink}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Toevoegen
            </button>
            <button
              onClick={() => setShowLinkModal(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Profielinformatie modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Contactinformatie Bewerken</h2>
            <input
              type="text"
              placeholder="Naam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Achternaam"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Functie"
              value={functionTitle}
              onChange={(e) => setFunctionTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Adres"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <input
              type="tel"
              placeholder="Telefoonnummer"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleSaveProfile}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Opslaan
            </button>
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Bio modal */}
      {showBioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Bio Bewerken</h2>
            <textarea
              placeholder="Schrijf je bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleSaveProfile}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Opslaan
            </button>
            <button
              onClick={() => setShowBioModal(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Achtergrondkleur modal */}
      {showBgColorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Achtergrondkleur Wijzigen</h2>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleSaveProfile}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Opslaan
            </button>
            <button
              onClick={() => setShowBgColorModal(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Profielgegevens succesvol opgeslagen!
        </div>
      )}
    </div>
  );
}
