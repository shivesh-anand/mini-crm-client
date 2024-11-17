// app/layout.tsx
import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";

import { Providers } from "./providers";

import AuthProvider from "@/app/AuthProvider";
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased bg-blue-50",
          fontSans.variable
        )}
      >
        <AuthProvider session={session}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <Toaster />
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
