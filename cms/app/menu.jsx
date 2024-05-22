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
        <Draggable allowAnyClick='false' cancel='select, details'>
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
                        <Link href='/p'>Profile</Link>
                    </nav>
                </details>


                {/* <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Profile</summary>
                    <nav>
                        <button onClick={() => {
                            supabase.auth.signOut();
                            push('/log');
                        }}>Unlog</button>
                    </nav>
                </details> */}


                <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Type</summary>
                    <select name="type">
                        <option value="0">Gallery</option>
                        <option value="1">Carroussel</option>
                        <option value="2">Linear Gallery</option>
                        <option value="3">Article</option>
                    </select>
                </details>


                <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Theme</summary>
                    truc
                </details>


            </div>
        </Draggable>
    )
}
