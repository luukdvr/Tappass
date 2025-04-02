"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../supabaseClient"; // Import Supabase client
import Image from "next/image"; // Import Image component
import Cropper from "react-easy-crop"; // Import Cropper component
import getCroppedImg from "../../utils/cropImage"; // Import utility function for cropping
import { useLanguage } from "../../context/LanguageContext"; // Import Language context

const translations = {
  nl: {
    uploadDesign: "Upload je design",
    save: "Opslaan",
    cancel: "Annuleren",
    delete: "Verwijderen",
    preview: "Voorbeeld",
  },
  en: {
    uploadDesign: "Upload your design",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    preview: "Preview",
  },
};

export default function DesignPage() {
  const [imageSrc, setImageSrc] = useState(null); // State for uploaded image source
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // State for crop position
  const [zoom, setZoom] = useState(1); // State for zoom level
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // State for cropped area pixels
  const [designImage, setDesignImage] = useState(null); // State for design image URL
  const [previewImage, setPreviewImage] = useState(null); // State for preview image
  const [user, setUser] = useState(null); // State for user
  const [error, setError] = useState(null); // State for error messages
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (user === null) {
      // Wait for user state to be determined
      return;
    }
    if (!user) {
      router.push(`/auth/login?redirectedFrom=/design`);
    }
  }, [user, router]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Handle save design
  const handleSaveDesign = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (designImage) {
        const oldFilePath = designImage.split('/').pop();
        await supabase.storage.from('designs').remove([oldFilePath]);
      }
      const { data, error: uploadError } = await supabase.storage
        .from('designs')
        .upload(`design-${Date.now()}.png`, croppedImage, { contentType: 'image/png' });
      if (uploadError) throw uploadError;
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('designs')
        .getPublicUrl(data.path);
      if (publicUrlError) throw new Error("Public URL ophalen mislukt.");
      const publicUrl = publicUrlData.publicUrl;
      await supabase.from('users').upsert({ id: user.id, pasimageurl: publicUrl }, { onConflict: 'id' });
      setDesignImage(publicUrl);
      setImageSrc(null);
    } catch {
      setError("Er is een fout opgetreden bij het opslaan van het design.");
    }
  };

  // Handle delete design
  const handleDeleteDesign = async () => {
    if (!designImage) {
      setError("Geen design om te verwijderen.");
      return;
    }

    try {
      const filePath = designImage.split('/').pop();
      const { error } = await supabase.storage
        .from('designs')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      setDesignImage(null);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (err) {
      console.error("Error deleting design:", err);
      setError(`Fout bij het verwijderen van het design: ${err.message}`);
    }
  };

  // Handle preview design
  const handlePreviewDesign = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const previewUrl = URL.createObjectURL(croppedImage);
      setPreviewImage(previewUrl);
    } catch (err) {
      console.error("Error generating preview:", err);
      setError(`Fout bij het genereren van de preview: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo%20tappass.png" alt="Tappass Logo" width={256} height={256} />
        </div>
        <h2 className="text-xl font-bold mb-4">{t.uploadDesign}</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        {designImage && !imageSrc && (
          <div className="relative w-full h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
            <Image
              src={designImage}
              alt="Design"
              layout="fill"
              objectFit="contain"
            />
            <button
              onClick={handleDeleteDesign}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              &times;
            </button>
          </div>
        )}
        {imageSrc && (
          <div className="relative w-full h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1012 / 638}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={false}
              style={{
                containerStyle: {
                  borderRadius: '0.5rem',
                },
                cropAreaStyle: {
                  borderRadius: '0.5rem',
                },
              }}
            />
            <button
              onClick={() => setImageSrc(null)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              &times;
            </button>
          </div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handlePreviewDesign}
          className="w-full bg-gray-500 text-white py-2 rounded-lg mb-2 shadow-md"
        >
          {t.preview}
        </button>
        <button
          onClick={handleSaveDesign}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 shadow-md"
        >
          {t.save}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-md"
        >
          {t.cancel}
        </button>
        <a
          href="https://buy.stripe.com/5kA7tzgFIe2z6Z2fYZ" // Stripe payment link
          target="_blank" // Open in a new tab
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 shadow-md text-center block"
          onClick={(e) => {
            e.preventDefault(); // Voorkom standaardactie
            window.open("https://buy.stripe.com/5kA7tzgFIe2z6Z2fYZ", "_blank"); // Open Stripe in een nieuw tabblad
            window.location.href = "/"; // Redirect huidige tabblad naar homepagina
          }}
        >
          Bestel nu
        </a>
        {previewImage && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">{t.preview}</h3>
            <div className="relative w-full h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
              <Image
                src={previewImage}
                alt="Preview"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleLanguage} className="p-2 rounded-full shadow-md">
          <Image
            src={language === 'nl' ? '/nl-flag.png' : '/uk-flag.png'}
            alt={language === 'nl' ? 'Dutch' : 'English'}
            width={64}
            height={64}
            className="rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
