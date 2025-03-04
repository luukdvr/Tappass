import "../styles/globals.css";
import { LanguageProvider } from '../context/LanguageContext'; // Import LanguageProvider

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
