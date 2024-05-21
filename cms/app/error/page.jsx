import { cookies } from 'next/headers'

export default function ErrorPage() {
    return <p>{cookies().get('error').value}</p>
}