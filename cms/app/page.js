import { createClient } from '/utils/supabase/server'
import { redirect } from 'next/navigation'




export default async function Home() {
    const supabase = createClient()

  return (
    <>
    <p>Hello</p>
    </>
  );
}
