import "./globals.css";
import type { Metadata } from "next";
import AlphaWrapper from "@/wrappers/Alpha";

export const metadata: Metadata = {
  title: {
    template: "%s | Codmify Hub",
    default: "Codmify Hub",
  },
  icons: { icon: "/brand/favicon.png", apple: "/brand/favicon.png" },
  description: "The Home of Development",
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
