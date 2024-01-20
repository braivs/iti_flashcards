import {MyYouTube} from "@/common/MyYouTube.tsx"
import {Button} from "@/components/ui/Button"
import sC from "@/components/ui/Dialogs/common/Dialogs.module.scss"

export const VideoElement = (props: Props) => {

    return (
        <>
            {
                props.youtubeUrl !== ''
                    ? <>
                        {
                            (props.questionVideoIdStatus && props.questionVideoId)
                                ? <MyYouTube
                                    videoId={props.questionVideoId}/>
                                : <div className={sC.dummyVideo}>Wrong video url</div>
                        }
                        <Button variant="secondary" className={sC.button} onClick={props.onQuestionChangeVideo}>
                            Change video
                        </Button>
                    </>
                    : <>
                        <div className={sC.dummyVideo}>Question video</div>
                        <Button variant="secondary" className={sC.button} onClick={props.onQuestionChangeVideo}>
                            Change video
                        </Button>
                    </>
            }
        </>
    )
}

type Props = {
    youtubeUrl: string
    questionVideoIdStatus: boolean
    questionVideoId: string | undefined
    onQuestionChangeVideo: () => void
}