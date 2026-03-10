import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

// Primary display font - Elegant serif (similar to Sailors)
// Replace with local Sailors font when available
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sailors",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Secondary font - Clean modern sans (similar to Ja Jayagiri Sans)
// Replace with local Ja Jayagiri Sans when available
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-jayagiri",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Body font - Clean geometric sans (similar to Cooper Hewitt)
// Replace with local Cooper Hewitt when available
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Feel Your Presence | Visibility That Converts, Growth That Lasts",
  description:
    "Feel Your Presence helps individuals and brands build a presence that people TRUST, REMEMBER, and CONNECT with. Strategy, systems, and execution for founders and businesses that want to be seen, trusted, and chosen.",
  keywords: [
    "digital marketing",
    "brand presence",
    "growth strategy",
    "SEO",
    "performance marketing",
    "business development",
    "GCC expansion",
    "automation",
  ],
  authors: [{ name: "Feel Your Presence" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Feel Your Presence | Visibility That Converts, Growth That Lasts",
    description:
      "Strategy, systems, and execution for founders and businesses that want to be seen, trusted, and chosen.",
    type: "website",
    images: [{ url: "/Feel your presence.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feel Your Presence | Visibility That Converts, Growth That Lasts",
    description:
      "Strategy, systems, and execution for founders and businesses that want to be seen, trusted, and chosen.",
    images: ["/Feel your presence.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b1c2d" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
