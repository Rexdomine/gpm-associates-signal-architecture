import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gpm-associates.ng"),
  title: "GPM Associates | Data Protection, Privacy Governance & Digital Trust",
  description:
    "GPM Associates helps organisations navigate regulatory complexity, strengthen privacy governance and turn responsible data practices into sustainable business value.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "GPM Associates | Data Protection, Privacy Governance & Digital Trust",
    description:
      "GPM Associates helps organisations navigate regulatory complexity, strengthen privacy governance and turn responsible data practices into sustainable business value.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2231",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
