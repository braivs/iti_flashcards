import s from './MyYouTube.module.scss'

export const MyYouTube = (props: Props) => {
    return <div className={s.container}>
        <iframe
            src={`https://www.youtube-nocookie.com/embed/${props.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={s.iframe}
        />
    </div>

}

type Props = {
    videoId: string
}