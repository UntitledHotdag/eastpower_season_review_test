import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "臺北伊斯特 主場賽事回顧 | TPVL Season Review",
  description: "生成您的 TPVL 臺北伊斯特主場賽事回顧",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#252422] text-[#FAE7D5]">
        {children}
      </body>
    </html>
  );
}
