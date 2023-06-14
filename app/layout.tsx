import "./globals.scss";
import { Providers } from "./providers";
import MainNav from "@/components/MainNav";
import { inter, SFMono } from "../assets/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayo Akindele",
  description: "Building interfaces to solve design problems.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Figma", "Radix UI"],
  authors: [
    {
      name: "Ayo Akindele",
      url: "https://www.ayoakindele.com/",
    },
  ],
  creator: "Ayo Akindele",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.ayoakindele.com/",
    title: "Ayo Akindele",
    description: "Building interfaces to solve design problems.",
    siteName: "Ayo Akindele",
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: "Ayo Akindele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayo Akindele",
    description: "Building interfaces to solve design problems.",
    creator: "Ayo Akindele",
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: "Ayo Akindele",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${SFMono.variable} font-sans`}>
        <Providers>
          <MainNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
