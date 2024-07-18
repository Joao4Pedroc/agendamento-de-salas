import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s / FEPECS",
    default: "Agendamento de salas",
  },
  description: "Website para agendamento de salas na FEPECS",
  icons: "logo_fepecs.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-10 my-4 bg-gray-200`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
