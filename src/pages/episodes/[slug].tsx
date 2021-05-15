import { useRouter } from 'next/router'

export default function Episodes() {
    const router = useRouter();
    console.log(router)


    return (
        <h1>{router.query.slug}</h1>
    )
}