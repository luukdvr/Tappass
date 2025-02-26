"use client"; // Zorgt ervoor dat deze code alleen in de browser draait

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebaseConfig"; // Ensure auth is imported
import { signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const [showLinkModal, setShowLinkModal] = useState(false); // State for link modal
  const [showProfileModal, setShowProfileModal] = useState(false); // State for profile modal
  const [showBgColorModal, setShowBgColorModal] = useState(false); // State for background color modal
  const [showBioModal, setShowBioModal] = useState(false); // State for bio modal
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const router = useRouter();
  const user = auth.currentUser; // Ensure auth is used correctly

  // Controleer of de gebruiker is ingelogd
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      loadProfile();
    }
  }, [user]);

  // Laad de profielgegevens van Firestore
  const loadProfile = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLinks(data.links || []);
        setBio(data.bio || ""); // Set bio from fetched data
        setName(data.name || ""); // Set name from fetched data
        setSurname(data.surname || ""); // Set surname from fetched data
        setAddress(data.address || ""); // Set address from fetched data
        setEmail(data.email || ""); // Set email from fetched data
        setPhone(data.phone || ""); // Set phone from fetched data
        setFunctionTitle(data.functionTitle || ""); // Set function title from fetched data
        setBgColor(data.bgColor || ""); // Set background color from fetched data
      }
    }
  };

  // Voeg een nieuwe link toe
  const handleAddLink = async () => {
    if (!newLink.trim()) return;

    const updatedLinks = [...links, { title: newLink, url: newLink }];
    setLinks(updatedLinks);
    setNewLink("");
    setShowLinkModal(false);

    if (user) {
      await setDoc(doc(db, "users", user.uid), { links: updatedLinks }, { merge: true });
    }
  };

  // Verwijder een link
  const handleDeleteLink = async (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);

    if (user) {
      await setDoc(doc(db, "users", user.uid), { links: updatedLinks }, { merge: true });
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
      await setDoc(doc(db, "users", user.uid), { links: reorderedLinks }, { merge: true });
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
      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      setShowProfileModal(false);
      setShowBgColorModal(false);
      setShowBioModal(false);
    }
  };

  // Uitloggen
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo%20tappass.png" alt="Tappass Logo" className="h-16" />
        </div>

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
            href={`/profile/${user?.uid}`}
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
