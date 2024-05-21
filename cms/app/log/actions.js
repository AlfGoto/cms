'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '/utils/supabase/server'

export async function login(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        // console.log(error)
        // process.env.logError = error
        cookies().set('error', error)
        redirect('/error')
    }



   


    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        cookies().set('error', error)
        redirect('/error')
    }
    const { data2, error2 } = await supabase
    .from('Users')
    .insert([
        { email:  formData.get('email')},
    ])
    .select()

    // login(formData)

    revalidatePath('/', 'layout')
    redirect('/')
}