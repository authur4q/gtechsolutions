import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav/page";
import { AuthProvider } from "../../provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GtechSolutions",
  description: "Gtech Solutions provides affordable, sustainable, and reliable second-hand supermarket supplies to help you build your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
