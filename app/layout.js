import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className="font-sans bg-gray-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
