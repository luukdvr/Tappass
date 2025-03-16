"use client"; // Zorgt ervoor dat deze code alleen in de browser draait

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../supabaseClient"; // Import Supabase client
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image"; // Import Image component
import { useLanguage } from "../../context/LanguageContext"; // Import Language context
import { FaPlusCircle } from "react-icons/fa"; // Import FaPlusCircle icon
import "../../styles/globals.css"; // Correct import path for global styles

const translations = {
  nl: {
    edit: "Bewerken",
    delete: "Verwijderen",
    addLink: "Link Toevoegen",
    viewProfile: "Bekijk jouw profielpagina",
    logout: "Uitloggen",
    editBio: "Bio Bewerken",
    editContact: "Contactinformatie Bewerken",
    yourLinks: "Jouw Links",
    newLinkTitle: "Titel van de link",
    newLinkUrl: "URL van de link",
    save: "Opslaan",
    cancel: "Annuleren",
    newLink: "Nieuwe Link Toevoegen",
    editLink: "Link Bewerken",
  },
  en: {
    edit: "Edit",
    delete: "Delete",
    addLink: "Add Link",
    viewProfile: "View your profile page",
    logout: "Logout",
    editBio: "Edit Bio",
    editContact: "Edit Contact Information",
    yourLinks: "Your Links",
    newLinkTitle: "Link Title",
    newLinkUrl: "Link URL",
    save: "Save",
    cancel: "Cancel",
    newLink: "Add New Link",
    editLink: "Edit Link",
  },
};

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState(""); // Add state for new link title
  const [bio, setBio] = useState(""); // Add state for bio
  const [name, setName] = useState(""); // Add state for name
  const [surname, setSurname] = useState(""); // Add state for surname
  const [address, setAddress] = useState(""); // Add state for address
  const [email, setEmail] = useState(""); // Add state for email
  const [phone, setPhone] = useState(""); // Add state for phone
  const [functionTitle, setFunctionTitle] = useState(""); // Add state for function title
  const [profileImage, setProfileImage] = useState(null); // Add state for profile image URL
  const [uploading, setUploading] = useState(false); // Add state for upload status
  const [showLinkModal, setShowLinkModal] = useState(false); // State for link modal
  const [showProfileModal, setShowProfileModal] = useState(false); // State for profile modal
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const [error, setError] = useState(null); // State for error
  const router = useRouter();
  const [user, setUser] = useState(null); // State for user
  const [editLinkIndex, setEditLinkIndex] = useState(null); // State for editing link index
  const [editLinkTitle, setEditLinkTitle] = useState(""); // State for editing link title
  const [editLinkUrl, setEditLinkUrl] = useState(""); // State for editing link URL
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [is_subscribed, setIsSubscribed] = useState(false); // State for subscription status

  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setError("Fout bij het ophalen van gebruikersgegevens. Probeer het later opnieuw.");
      } else {
        setUser(data.user);
        setIsSubscribed(data.user.is_subscribed); // Set subscription status
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
        setProfileImage(data.profileimageurl || null); // Set profile image from fetched data
      } catch (err) {
        console.error("Error loading profile:", err);
        setError(`Fout bij het laden van profielgegevens: ${err.message}`);
      }
    }
  }, [user]);

  // Controleer of de gebruiker is ingelogd en heeft een abonnement
  useEffect(() => {
    const checkSubscription = async () => {
      if (user === null) {
        // Wait for user state to be determined
        return;
      }
      if (!user) {
        router.push("/auth/login");
      } else {
        const { data, error } = await supabase
          .from("users")
          .select("is_subscribed")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error("Error checking subscription:", error);
          setError(`Fout bij het controleren van het abonnement: ${error.message}`);
        } else if (!data.is_subscribed) {
          window.location.href = '/design'; // Redirect to subscription page
        } else {
          loadProfile();
        }
      }
    };

    checkSubscription();
  }, [user, router, loadProfile]);

  // Voeg een nieuwe link toe
  const handleAddLink = async () => {
    if (!newLink.trim() || !newLinkTitle.trim()) return;
    if (newLinkTitle.length > 30) {
      setError("De titel van de link mag maximaal 30 symbolen bevatten.");
      return;
    }

    const updatedLinks = [...links, { title: newLinkTitle, url: newLink }];
    setLinks(updatedLinks);
    setNewLink("");
    setNewLinkTitle("");
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

  // Bewerk een link
  const handleEditLink = (index) => {
    setEditLinkIndex(index);
    setEditLinkTitle(links[index].title);
    setEditLinkUrl(links[index].url);
    setShowLinkModal(true);
  };

  // Update een link
  const handleUpdateLink = async () => {
    if (!editLinkTitle.trim() || !editLinkUrl.trim()) return;
    if (editLinkTitle.length > 30) {
      setError("De titel van de link mag maximaal 30 symbolen bevatten.");
      return;
    }

    const updatedLinks = links.map((link, index) =>
      index === editLinkIndex ? { title: editLinkTitle, url: editLinkUrl } : link
    );
    setLinks(updatedLinks);
    setEditLinkIndex(null);
    setEditLinkTitle("");
    setEditLinkUrl("");
    setShowLinkModal(false);

    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ links: updatedLinks })
          .eq("id", user.id);
        if (error) throw error;
      } catch (err) {
        console.error("Error updating link:", err);
        setError(`Fout bij het bijwerken van de link: ${err.message}`);
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
    <div className="min-h-screen flex items-center justify-center p-6">
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
            
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer shadow-md">
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

        {/* Profielinformatie knop */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4 shadow-md"
        >
          {t.editContact}
        </button>

        {/* Lijst met links */}
        <h3 className="text-lg font-bold mt-6 text-gray-700">{t.yourLinks}</h3>
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
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                          {link.title}
                        </a>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditLink(index)}
                            className="text-blue-500 text-sm"
                          >
                            {t.edit}
                          </button>
                          <button
                            onClick={() => handleDeleteLink(index)}
                            className="text-red-500 text-sm"
                          >
                            {t.delete}
                          </button>
                        </div>
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
        <div
          onClick={() => setShowLinkModal(true)}
          className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg mt-4 shadow-md flex items-center justify-center cursor-pointer"
        >
          <FaPlusCircle className="mr-2" /> {t.addLink}
        </div>

        {/* Knop naar profielpagina */}
        <div className="text-center mt-4">
          <a
            href={`/profile/${user?.id}`}
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.viewProfile}
          </a>
        </div>

        {/* Uitlogknop */}
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded mt-4 shadow-md">
          {t.logout}
        </button>
      </div>

      {/* Link toevoegen/bewerken modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editLinkIndex !== null ? t.editLink : t.newLink}</h2>
            <input
              type="text"
              placeholder={t.newLinkTitle}
              value={editLinkIndex !== null ? editLinkTitle : newLinkTitle}
              onChange={(e) => editLinkIndex !== null ? setEditLinkTitle(e.target.value) : setNewLinkTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              maxLength={30} // Set max length for input
            />
            <input
              type="text"
              placeholder={t.newLinkUrl}
              value={editLinkIndex !== null ? editLinkUrl : newLink}
              onChange={(e) => editLinkIndex !== null ? setEditLinkUrl(e.target.value) : setNewLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={editLinkIndex !== null ? handleUpdateLink : handleAddLink}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 shadow-md"
            >
              {t.save}
            </button>
            <button
              onClick={() => {
                setShowLinkModal(false);
                setEditLinkIndex(null);
                setEditLinkTitle("");
                setEditLinkUrl("");
              }}
              className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-md"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Profielinformatie modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{t.editContact}</h2>
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
            <textarea
              placeholder="Schrijf je bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 shadow-md"
            >
              {t.save}
            </button>
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-md"
            >
              {t.cancel}
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

      {/* Language toggle button */}
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleLanguage} className="p-2 rounded-full shadow-md">
          <Image
            src={language === 'nl' ? '/nl-flag.png' : '/uk-flag.png'}
            alt={language === 'nl' ? 'Dutch' : 'English'}
            width={64}
            height={64}
            className="rounded-full" // Add class to make the image circular
          />
        </button>
      </div>
    </div>
  );
}
