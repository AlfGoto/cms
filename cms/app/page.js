import { createClient } from '/utils/supabase/server'
import { redirect } from 'next/navigation'




export default async function Home() {
    const supabase = createClient()
    // const [user, setUser] = useState(null);

    // async function getUser() {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     setUser(user)

    //     if(user == null){
    //         redirect('/log')
    //     }
    // }

    // useEffect(()=>{
    //     getUser()
    // }, [])

    // console.log(user)

  return (
    <>
    <p>Hello</p>
    </>
  );
}
