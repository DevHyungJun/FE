import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import QueryProvider from "./QueryProvider";
import ChatUIButton from "./components/ChatUIButton";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

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
            <ChatUIButton />
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
