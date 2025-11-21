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
  title: {
    default: "DoggyChat - AI Dog Breed Advisor",
    template: "%s | DoggyChat",
  },
  description: "AI-powered chat assistant that helps you choose the perfect dog breed based on your personality and lifestyle. Get expert advice on dog breeds using OpenAI and LangGraph.",
  keywords: [
    "dog breeds",
    "dog advisor",
    "AI chat",
    "OpenAI",
    "LangGraph",
    "dog breed recommendation",
    "puppy advisor",
    "dog selection",
    "AI assistant",
    "chatbot",
  ],
  authors: [{ name: "Esteban Sanchez" }],
  creator: "Esteban Sanchez",
  publisher: "Esteban Sanchez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/esteban03/doggychat",
    siteName: "DoggyChat",
    title: "DoggyChat - AI Dog Breed Advisor",
    description: "AI-powered chat assistant that helps you choose the perfect dog breed based on your personality and lifestyle.",
    images: [
      {
        url: "/dog.jpg",
        alt: "DoggyChat - AI Dog Breed Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoggyChat - AI Dog Breed Advisor",
    description: "AI-powered chat assistant that helps you choose the perfect dog breed based on your personality and lifestyle.",
    images: ["/dog.jpg"],
    creator: "@esteban03",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  category: "technology",
  alternates: {
    canonical: "https://github.com/esteban03/doggychat",
  },
  metadataBase: new URL("https://github.com/esteban03/doggychat"),
  other: {
    "github:owner": "esteban03",
    "github:repo": "doggychat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
