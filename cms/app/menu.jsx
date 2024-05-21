'use client'

import Link from "next/link";
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(false)

    const supabase = createClientComponentClient()

    const { push } = useRouter();

    return (
        <>
            <button onClick={() => { setMenuHidden(!menuHidden) }}>X</button>
            <details className={menuHidden ? 'hidden' : ''}>
                <summary>Pages</summary>
                <nav>
                    <Link href='/'>Home</Link>
                    <Link href='/log'>Login</Link>
                </nav>
            </details>
            <details className={menuHidden ? 'hidden' : ''}>
                <summary>Profile</summary>
                <nav>
                    <button onClick={() => {
                        // console.log('ok')
                        supabase.auth.signOut()
                        push('/log');
                    }}>Unlog</button>
                    <Link href='/p'>Profile</Link>
                </nav>
            </details>
        </>
    )
}