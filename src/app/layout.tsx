import "./globals.css";
import type { Metadata } from "next";
import AlphaWrapper from "@/wrappers/Alpha";

export const metadata: Metadata = {
  title: "Fichub - The Home of Development",
  description: "--- Insert a description here ---",
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
