import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '/utils/supabase/server'


import { login, signup } from './actions'

export default function LoginPage() {

    return (
        <form id='logForm'>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <div>
                <button formAction={login}>Log in</button>
                <button formAction={signup}>Sign up</button>
            </div>

        </form>
    )
}