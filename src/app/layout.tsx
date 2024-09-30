import "./globals.css";
import type { Metadata } from "next";
import AlphaWrapper from "@/wrappers/Alpha";

export const metadata: Metadata = {
  title: {
    template: "%s | Codmify Hub",
    default: "Codmify Hub",
  },
  keywords: [
    "Software Development, React, Next.js, Web Development, Scalable Web Applications, Codmify Hub, Mobile Development, UIUX",
  ],
  icons: { icon: "/brand/favicon.png", apple: "/brand/favicon.png" },
  description: `Codmify is a platform which seamlessly
        connects businesses with top-tier developers, designers, and a network
        of skilled professionals ready to bring your projects to life. From
        software development to digital marketing, we have the expertise to
        drive your success.`,
  openGraph: {
    type: "website",
    url: "https://www.codmify.com",
    title: "Codmify Hub",
    description: `Codmify is a platform which seamlessly
        connects businesses with top-tier developers, designers, and a network
        of skilled professionals ready to bring your projects to life. From
        software development to digital marketing, we have the expertise to
        drive your success.`,
    images: [
      {
        url: "https://www.codmify.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codmify Hub's Website Thumbnail",
      },
    ],
    siteName: "Codmify Hub",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@codmify",
    title: "Codmify Hub",
    description: `Codmify is a platform which seamlessly
        connects businesses with top-tier developers, designers, and a network
        of skilled professionals ready to bring your projects to life. From
        software development to digital marketing, we have the expertise to
        drive your success.`,
    images: "https://www.codmify.com/og-image.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AlphaWrapper>{children}</AlphaWrapper>
      </body>
    </html>
  );
}
