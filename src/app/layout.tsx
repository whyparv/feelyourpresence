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
  title: "Feel Your Presence",
  description: "Visibility That Converts, Growth That Lasts",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/logo.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    title: "Feel Your Presence - Coming Soon",
    description: "Something extraordinary is on the horizon.",
    type: "website",
    images: [{ url: '/logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feel Your Presence - Coming Soon",
    description: "Something extraordinary is on the horizon.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b1c2d" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
