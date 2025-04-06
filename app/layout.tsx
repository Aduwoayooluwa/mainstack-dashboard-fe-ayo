import type { Metadata } from "next";
import { degular } from "@/lib/fonts";
import "./globals.css";
import AppProvider from "./app-provider";

export const metadata: Metadata = {
  title: "Revenue App",
  description: "Revenue tracking application",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${degular.className} antialiased`}>
        <AppProvider>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
