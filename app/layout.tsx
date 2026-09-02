import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Mono, Archivo } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ROT — the website that lives and dies",
    template: "%s — ROT",
  },
  description:
    "a website born the moment you arrive and dead within three minutes. your attention is the only thing keeping it alive. an elegy in html and css.",
  applicationName: "ROT",
  keywords: ["rot", "mayfly", "elegy", "memento mori", "attention"],
  openGraph: {
    title: "ROT — the website that lives and dies",
    description:
      "born when you arrive. dead within three minutes. your attention is the only thing keeping it alive.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFE2" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0908" },
  ],
};

// the server renders a neutral, freshly-born state. all time logic lives in
// the client so there is never a hydration mismatch.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-stage="alive"
      style={{ "--decay": "0" } as React.CSSProperties}
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
