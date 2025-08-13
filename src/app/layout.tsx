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
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "su15boldmx");
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
