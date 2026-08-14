import "./globals.css";
import { Inter, Syne } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import { getDbData } from "@/lib/db";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import CharacterAssistant from "@/components/CharacterAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Gurukripa Builders — Premium Construction & Architectural Excellence",
  description:
    "Pioneering luxury construction, turnkey residential villas, commercial landmarks, and bespoke interior design across Kerala, India.",
  keywords: [
    "Gurukripa Builders",
    "Builders in Cheemeni",
    "Construction company Kerala",
    "Villa contractors Kasaragod",
    "Interior design Cheruvathur",
    "Architectural planning Kerala",
  ],
  authors: [{ name: "Gurukripa Builders" }],
  openGraph: {
    title: "Gurukripa Builders — Building Visions, Constructing Reality",
    description:
      "Turnkey construction, luxury residential villas, and commercial complexes with precision engineering.",
    url: "https://gurukripabuilders.com",
    siteName: "Gurukripa Builders",
    images: [
      {
        url: "/hero-new.png",
        width: 1200,
        height: 630,
        alt: "Gurukripa Builders",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0B0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const initialData = getDbData();

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <DataProvider initialData={initialData}>
          {/* Global Noise Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Interactive Scroll Bar */}
          <ScrollProgress />

          {/* Luxury Custom Cursor */}
          <CustomCursor />

          {/* Main App Content */}
          <main>{children}</main>

          {/* Sticky Floating WhatsApp Action */}
          <StickyWhatsApp />

          {/* 3D Animated Character Assistant */}
          <CharacterAssistant />
        </DataProvider>
      </body>
    </html>
  );
}
