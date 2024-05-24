import { Inter } from "next/font/google";
import "./globals.css";
import Menu from './menu.jsx'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AlfCMS",
    description: "The simplest CMS ever",
};



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <section id="menu"><Menu /></section>
                <section id="left"></section>
                <section id="center">{children}</section>
                <section id="right"></section>
            </body>
        </html>
    );
}
