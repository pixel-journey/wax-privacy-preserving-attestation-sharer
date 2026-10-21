import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Drop the named fields',
  description: 'secret is dropped. name and note stay. Nothing is encrypted.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
