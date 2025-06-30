import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yi Cui - Product Designer",
  description: "Product Designer crafting digital experiences that matter. Bold. Minimal. Impactful.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JDC7872TV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JDC7872TV');
            `,
          }}
        />
      </head>
      <body className="font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
