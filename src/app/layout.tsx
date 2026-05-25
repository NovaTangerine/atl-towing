import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import { DevToolsOverlay } from "@/components/DevToolsOverlay";

export const metadata: Metadata = {
  title: "ATL Towing Prototype",
  description: "Wizard of Oz Prototype for ATL Towing Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
        <DevToolsOverlay />
      </body>
    </html>
  );
}
