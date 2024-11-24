import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Gleammore",
  description: 'Gleammore: In the realm of shopping, "gleammore" conveys an irresistible charm and enhanced brilliance of products that catch the eye on store shelves. It evokes the notion of items that not only dazzle but also offer exceptional value, drawing in shoppers with their captivating presentation and encouraging them to discover more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center"
          toastOptions={{
            classNames: {
              error: 'bg-red-300',
              success: 'text-green-300',
              warning: 'text-yellow-300',
              info: 'bg-blue-300'
            },
          }}
          richColors />
      </body>
    </html>
  );
}
