"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "./apolloConfig/apolloClientWrapper";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
