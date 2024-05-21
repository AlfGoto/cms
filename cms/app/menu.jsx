'use client'

import Link from "next/link";
import { useState } from "react";

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(false)
    console.log(menuHidden)
    let str = menuHidden

    return (
        <>
            <button onClick={() => {
                if (menuHidden == 'hidden') {
                    setMenuHidden(null)
                } else {
                    setMenuHidden('hidden')
                }
            }}>X</button>
            <details className={menuHidden ? 'hidden' : ''}>
                <summary>Pages</summary>
                <nav>
                    <Link href='/'>Home</Link>
                    <Link href='/log'>Login</Link>
                </nav>
            </details>
        </>
    )
}