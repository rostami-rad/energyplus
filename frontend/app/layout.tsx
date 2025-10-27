import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnergyPlus Chat Interface",
  description: "Run building energy simulations through a conversational interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

