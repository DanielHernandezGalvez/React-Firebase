import React, { ReactNode } from "react";
import Navibar from "@/components/Navibar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Next Router",
  description: "Uso de las nuevas características de next",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/slate/bootstrap.min.css"
        />
      </head>
      <body className={inter.className}>
        <Navibar />
        <div className="container p-4"> {children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
