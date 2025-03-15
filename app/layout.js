import "../styles/globals.css";
import { LanguageProvider } from '../context/LanguageContext'; // Import LanguageProvider
import Image from "next/image"; // Import Image component

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className="font-sans min-h-screen flex flex-col relative">
        <Image
          src="/blue-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex-grow">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
