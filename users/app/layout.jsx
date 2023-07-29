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
}
