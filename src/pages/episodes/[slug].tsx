import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { api } from '../../services/api'
import { format, parseISO } from 'date-fns';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './episode.module.scss'

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    publishedAt: string;
    duration: number;
    description: string;
    url: string;
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episodes({ episode }: EpisodeProps) {
    // const router = useRouter();
    // console.log(router)


    return (
        <div className={styles.episodes}>
            <div className={styles.thumbnailContainer}>
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar" />
                </button>
                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                <button type="button">
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.duration}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}>

            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {

        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url

    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, // 24 hours
    }
}