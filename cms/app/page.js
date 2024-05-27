'use client'

import { useEffect, useState } from "react";
import InnerHTML from 'dangerously-set-html-content'

export default function Preview() {
    const [preview, setPreview] = useState('<p>Loading...</p>')


    useEffect(()=>{
        checkPreviewChange('')
    }, [])
    function checkPreviewChange(arg){
        setTimeout(()=>{
            let actualPreview = localStorage.getItem('preview')
            if(arg != actualPreview){
                console.log('New preview')
                setPreview(actualPreview)
                checkPreviewChange(actualPreview)
            }else{
                checkPreviewChange(arg)
            }

        },100)
    }

    return (
        <>
        <InnerHTML html={preview} allowRerender={true}/>
        </>
        // <div id='previewDIV' dangerouslySetInnerHTML={{ __html: preview }} />
    );
}
