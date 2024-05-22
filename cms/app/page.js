import { createClient } from '/utils/supabase/server'
import { redirect } from 'next/navigation'




export default async function Home() {
    const supabase = createClient()


    const { data: { user } } = await supabase.auth.getUser()
    // console.log(user)
    if(user == null){
        redirect('/log')
    }

  return (
    <>
    <p>Hello</p>
    </>
  );
}
