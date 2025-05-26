import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import QueryProvider from "./QueryProvider";
import Script from "next/script";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "anyshop",
  description:
    "anyshop은 트렌디한 상품부터 인기 상품까지 다양한 상품을 제공합니다.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="regular">
        <QueryProvider>
          <NextUIProvider>
            <Header />
            <div className="min-h-[calc(100vh-333px)] sm:min-h-[calc(100vh-502px)] md:min-h-[calc(100vh-330px)]">
              {children}
            </div>
            <Footer />
            <Script src="https://pay.nicepay.co.kr/v1/js/" />
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
