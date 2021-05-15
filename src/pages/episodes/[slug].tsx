import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api'

export default function Episodes() {
    const router = useRouter();
    console.log(router)


    return (
        <h1>{router.query.slug}</h1>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    const { data } = await api.get(`/episodes/${slug}`);

    return {
        props: {},
        revalidate: 60 * 60 * 24, // 24 hours
    }
}