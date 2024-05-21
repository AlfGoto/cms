import { Inter } from "next/font/google";
import "./globals.css";
import Menu  from './menu.jsx'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AlfCMS",
    description: "The simplest CMS ever",
};



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div id="menu"><Menu /></div>
                <div id="left"></div>
                <div id="center">{children}</div>
                <div id="right"></div>
            </body>
        </html>
    );
}
