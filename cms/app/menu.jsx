'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Draggable from 'react-draggable';

import { uploadFile } from "./actions";

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(false);
    const [imgHidden, setImgHidden] = useState(true);
    const [button, setButton] = useState('X');
    const [user, setUser] = useState(null);

    const supabase = createClientComponentClient();

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user == null) {
            console.log('REDIRECT')
            push('/log')
        }
    }

    const uploadFile = async (event) => {
        const file = event.target.files[0];
        const bucket = "Images"

        // Call Storage API to upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(Date.now() + '-' + user.email, file);

        // Handle error if upload failed
        if (error) {
            console.log(error)
            alert(error.error, error.message);
            return;
        }
        console.log(data)
        console.log(user)


        const { data2, error2 } = await supabase
            .from('img_list')
            .insert([
                { id_user: user.id, img: data.fullPath },
            ])

        console.log(error2)

        alert('File uploaded successfully!');
    };

    useEffect(() => {
        getUser()
    }, [])


    const { push } = useRouter();

    async function typeSelect(e) {
        const { data, error } = await supabase
            .from('Users')
            .update({ type: e.target.value })
            .eq('email', user.email)
            .select()
    }
    async function themeSelect(e) {
        const { data, error } = await supabase
            .from('Users')
            .update({ theme: e.target.value })
            .eq('email', user.email)
            .select()
    }

    return (
        <>
            <div className={imgHidden ? 'hidden' : ''} id='imgDIV'>
                <div id='addImgDiv'>
                    <h1>Upload Image</h1>
                    <input type="file" onChange={uploadFile} accept='image/jpeg, image/jpg, image/png' />
                </div>
            </div>



            <Draggable allowAnyClick='false' cancel='select, details, button'>
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

                    <details className={menuHidden ? 'hidden' : ''}>
                        <summary>Type</summary>
                        <select name="type" onChange={typeSelect}>
                            <option value="0">Gallery</option>
                            <option value="1">Carroussel</option>
                            <option value="2">Linear Gallery</option>
                            <option value="3">Article</option>
                        </select>
                    </details>


                    <details className={menuHidden ? 'hidden' : ''}>
                        <summary>Theme</summary>
                        <select name="type" onChange={themeSelect}>
                            <option value="0">Dark White</option>
                            <option value="1">Blue</option>
                            <option value="2">Red</option>
                            <option value="3">Green</option>
                        </select>
                    </details>

                    <button onClick={() => { setImgHidden(!imgHidden) }}>
                        Images
                    </button>


                </div>
            </Draggable>

        </>
    )
}


{/* <details className={menuHidden ? 'hidden' : ''}>
                    <summary>Profile</summary>
                    <nav>
                        <button onClick={() => {
                            supabase.auth.signOut();
                            push('/log');
                        }}>Unlog</button>
                    </nav>
                </details> */}