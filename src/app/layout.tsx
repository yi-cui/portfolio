import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Product Designer",
  description: "Modern portfolio with AI chat assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
