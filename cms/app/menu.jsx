'use client'

import Link from "next/link";
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Draggable from 'react-draggable';

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(false);
    const [button, setButton] = useState('X');

    const supabase = createClientComponentClient();

    const { push } = useRouter();

    return (
        <Draggable>
            <div>


                <button onClick={() => {
                    setButton(menuHidden ? 'X' : 'Menu')
                    setMenuHidden(!menuHidden)
                }} id='closeOpenButton'><p>{button}</p></button>


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
                            supabase.auth.signOut();
                            push('/log');
                        }}>Unlog</button>
                        <Link href='/p'>Profile</Link>
                    </nav>
                </details>


                <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Type</summary>
                    truc
                </details>


                <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Theme</summary>
                    truc
                </details>


            </div>
        </Draggable>
    )
}
