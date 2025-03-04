import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import QueryProvider from "./QueryProvider";
import ChatUIButton from "./components/ChatUIButton";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Shopping Mall",
  description: "Shopping Mall Site",
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
            {children}
            <Script src="https://pay.nicepay.co.kr/v1/js/" />
            <ChatUIButton />
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
