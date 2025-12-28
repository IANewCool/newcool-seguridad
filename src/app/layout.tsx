import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seguridad Ciudadana Chile | NewCooltura Informada",
  description: "Comisarias, emergencias, tipos de delitos, calculadora de prescripcion y derechos del detenido en Chile",
  keywords: ["seguridad ciudadana", "comisarias", "delitos", "derechos detenido", "emergencias"],
  openGraph: {
    title: "Seguridad Chile - NewCooltura Informada",
    description: "Comisarias, emergencias y derechos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
