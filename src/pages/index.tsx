export default function Home({ episode }) {



  return (
    <>
      <p>{JSON.stringify(episode)}</p>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json()

  return {
    props: {
      episode: data
    },
    //a cada 8 horas ira gerar uma nova versão desta pagina
    revalidate: 60 * 60 * 8,
  }
}