export const MyYouTube = (props: Props) => {

    return <iframe
        width={480}
        height={270}
        src={`https://www.youtube.com/embed/${props.videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />
}

type Props = {
    videoId: string
}