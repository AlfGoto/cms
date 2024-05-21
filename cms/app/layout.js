import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AlfCMS",
    description: "The simplest CMS ever",
};

function Nav() {
    return (<nav>
        <Link href='/'>Home</Link>
        <Link href='/log'>Login</Link>
    </nav>)
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div id="left"><Nav /></div>
                <div id="center">{children}</div>
                <div id="right"></div>
            </body>
        </html>
    );
}
