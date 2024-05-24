'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Draggable from 'react-draggable';

import html from './createHTML'

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(false);
    const [imgHidden, setImgHidden] = useState(true);
    const [button, setButton] = useState('X');
    const [user, setUser] = useState(null);
    const [imgList, setImgList] = useState([]);

    const [type, setType] = useState(0);
    const [theme, setTheme] = useState(0);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [autor, setAutor] = useState('');

    let path = "https://qwxbnqtgqvaccdburxbp.supabase.co/storage/v1/object/public/"
    const supabase = createClientComponentClient();

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        // console.log(user)

        if (!user) {
            console.log('REDIRECT')
            push('/log')
        } else {
            getPics(user.id)
            getOptions(user.email)
        }
    }
    async function getOptions(mail) {

        let { data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .eq('email', mail)

        if (error) {
            console.log(error)
        } else {
            let utilisateur = Users[0]
            // console.log(utilisateur)

            setTheme(utilisateur.theme)
            setType(utilisateur.type)
            setTitle(utilisateur.title)
            setDesc(utilisateur.desc)
            setAutor(utilisateur.autor)
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
        // console.log(data)
        // console.log(user)


        const { data2, error2 } = await supabase
            .from('img_list')
            .insert([
                { id_user: user.id, img: data.fullPath },
            ])

        // console.log(error2)

        alert('Image uploaded successfully!');
        getPics(user.id)
        event.target.value = null
    };

    useEffect(() => {
        getUser()
    }, [])


    const { push } = useRouter();

    async function typeSelect(e) {
        setType(e.target.value)
        const { data, error } = await supabase
            .from('Users')
            .update({ type: e.target.value })
            .eq('email', user.email)
            .select()
    }
    async function themeSelect(e) {
        setTheme(e.target.value)
        const { data, error } = await supabase
            .from('Users')
            .update({ theme: e.target.value })
            .eq('email', user.email)
            .select()
    }
    async function changeTitle(e) {
        setTitle(e.target.value)
        const { data, error } = await supabase
            .from('Users')
            .update({ title: e.target.value })
            .eq('email', user.email)
            .select()
    }
    async function changeDesc(e) {
        setDesc(e.target.value)
        const { data, error } = await supabase
            .from('Users')
            .update({ desc: e.target.value })
            .eq('email', user.email)
            .select()
    }
    async function changeAutor(e) {
        setAutor(e.target.value)
        const { data, error } = await supabase
            .from('Users')
            .update({ autor: e.target.value })
            .eq('email', user.email)
            .select()
    }


    async function getPics(id) {

        let { data: img_list, error } = await supabase
            .from('img_list')
            .select("*")
            .eq('id_user', id)
            .select()
            .order('id', { ascending: false })


        img_list.forEach(i => {
            let NameClass = ''
            
            if (i.favicon) NameClass += ' icon'
            if (i.selected) NameClass += ' selected'
            
            i.class = NameClass
            // console.log(i)

        })
        setImgList(img_list)
        // console.log(img_list)
    }
    async function clickOnImage(e) {
        let arg = e.target
        let imgPath = arg.src.split('/public/')[1]
        // console.log(e)

        // if()
        if (e.detail == 1) {
            arg.classList.toggle('selected')
            let bool = arg.classList.contains('selected')
            // console.log(bool)
            // console.log(imgPath)

            const { data, error } = await supabase
                .from('img_list')
                .update({ selected: bool })
                .eq('img', imgPath)
                .select()

            if (error) {
                console.log(error)
            }
        } else if (e.detail == 2) {
            const { error } = await supabase
                .from('img_list')
                .delete()
                .eq('img', imgPath)

            if (error) console.log(error)

            const { data, error2 } = await supabase
                .storage
                .from('Images')
                .remove([imgPath.split('/')[1]])

            if (error2) console.log(error2)
        }

        getPics(user.id)

    }
    async function rightClickOnImg(dom) {
        let oldDOM = document.querySelector('.icon')
        if (oldDOM != null) {
            const { data, error } = await supabase
                .from('img_list')
                .update({ favicon: false })
                .eq('img', oldDOM.src.split('/public/')[1])
                .select()

            if (error) {
                console.log(error)
            }
            oldDOM.classList.remove('icon')
        }
        dom.classList.add('icon')

        let imgPath = dom.src.split('/public/')[1]

        const { data, error } = await supabase
            .from('img_list')
            .update({ favicon: true })
            .eq('img', imgPath)
            .select()

        if (error) {
            console.log(error)
        }
        getPics(user.id)

        const { data2, error2 } = await supabase
            .from('Users')
            .update({ favicon: imgPath })
            .eq('email', user.email)
            .select()
    }


    return (
        <>
            <div className={imgHidden ? 'hidden' : ''} id='imgDIV'>
                <div id='addImgDiv'>
                    <h1>Upload Image <p>Left Click to select, Double to remove, Right to favicon</p></h1>
                    <input type="file" onChange={uploadFile} accept='image/jpeg, image/jpg, image/png' />
                </div>
                <div id='imageList'>
                    {imgList?.map(i =>
                        <img
                            src={path + i.img}
                            key={i.id}
                            alt='Loading...'
                            className={i.class}
                            // className={i.selected ? 'selected' : '' + ' ' + i.favicon ? 'icon' : ''}
                            onClick={e => { clickOnImage(e) }}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                rightClickOnImg(e.target)
                            }}
                        ></img>
                    )}
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
                        <summary>Custom</summary>
                        <label htmlFor="type">Type</label>
                        <select name="type" onChange={typeSelect} value={type}>
                            <option value="0">Gallery</option>
                            <option value="1">Carroussel</option>
                            <option value="2">Linear Gallery</option>
                            <option value="3">Article</option>
                        </select>
                        <label htmlFor="theme">Theme</label>
                        <select name="theme" onChange={themeSelect} value={theme}>
                            <option value="0">Dark White</option>
                            <option value="1">Blue</option>
                            <option value="2">Red</option>
                            <option value="3">Green</option>
                        </select>
                    </details>


                    <details>
                        <summary>Meta</summary>

                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={title} onChange={e => { changeTitle(e) }} />

                        <label htmlFor="desc">Desc</label>
                        <textarea type="text" name="desc" value={desc} onChange={e => { changeDesc(e) }} />

                        <label htmlFor="autor">Autor</label>
                        <input type="text" name="autor" value={autor} onChange={e => { changeAutor(e) }} />
                    </details>


                    {/* <details className={menuHidden ? 'hidden' : ''}>
                        <summary>Theme</summary>
                    </details> */}

                    <button onClick={() => { setImgHidden(!imgHidden) }} className={menuHidden ? 'hidden' : ''}>
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