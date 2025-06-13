import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filerman - File Transfer Made Easy",
  description: "Transfer Files with Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#262626",
          colorText: "#e5e5e5",
          colorTextOnPrimaryBackground: "#e5e5e5",
          colorPrimary: "#3b82f6",
          colorTextSecondary: "#e5e5e5",
          colorInputBackground: "#262626",
          colorInputText: "#e5e5e5",
          colorNeutral: "#e5e5e5",
          colorDanger: "red",
        },
      }}
    >
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        >
          <Navbar />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
