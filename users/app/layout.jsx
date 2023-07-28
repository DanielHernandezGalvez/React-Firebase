import Navibar from "@/components/Navibar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Router",
  description: "Uso de las nuevas características de next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navibar />
        {children}
      </body>
    </html>
  );
}
