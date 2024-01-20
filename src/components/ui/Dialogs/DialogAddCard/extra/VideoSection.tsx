import sP from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import {ApproveCancelTextField} from "@/components/ui/Dialogs/DialogAddCard/extra/ApproveCancelTextField.tsx"
import {useState} from "react"
import {extractYouTubeVideoId} from "@/components/ui/Dialogs/common/utils.ts"
import {VideoElement} from "@/components/ui/Dialogs/DialogAddCard/extra/VideoElement.tsx"

export const VideoSection = (props: Props) => {
    const [isQuestionEdit, setIsQuestionEdit] = useState(false)
    const [isAnswerEdit, setIsAnswerEdit] = useState(false)

    const [tempQuestionUrl, setTempQuestionUrl] = useState(props.youtubeQuestionUrl)
    const [tempAnswerUrl, setTempAnswerUrl] = useState(props.youtubeAnswerUrl)

    const {videoId: questionVideoId, success: questionVideoIdStatus} = extractYouTubeVideoId(tempQuestionUrl)
    const {videoId: answerVideoId, success: answerVideoIdStatus} = extractYouTubeVideoId(tempAnswerUrl)

    const onQuestionChangeVideo = () => {
        setIsQuestionEdit(true)
    }

    const onAnswerChangeVideo = () => {
        setIsAnswerEdit(true)
    }

    const onQuestionApprove = () => {
        if (questionVideoIdStatus && questionVideoId) {
            props.setYoutubeQuestionUrl(tempQuestionUrl)
            setIsQuestionEdit(false)
        } else {
            alert('wrong question link')
        }
    }

    const onAnswerApprove = () => {
        if (answerVideoIdStatus && answerVideoId) {
            props.setYoutubeAnswerUrl(tempAnswerUrl)
            setIsAnswerEdit(false)
        } else {
            alert('wrong answer link')
        }
    }

    const onQuestionCancel = () => {
        setIsQuestionEdit(false)
    }

    const onAnswerCancel = () => {
        setIsAnswerEdit(false)
    }

    return (
        <div>
            <div className={sP.DialogDescription}>
                {
                    !isQuestionEdit
                        ? <VideoElement
                            youtubeUrl={props.youtubeQuestionUrl}
                            questionVideoIdStatus={questionVideoIdStatus}
                            questionVideoId={questionVideoId}
                            onQuestionChangeVideo={onQuestionChangeVideo}
                        />
                        : <ApproveCancelTextField
                            tempValue={tempQuestionUrl}
                            setTempValue={setTempQuestionUrl}
                            onApprove={onQuestionApprove}
                            onCancel={onQuestionCancel}
                            label={'Question Youtube id'}
                        />
                }
                <div>
                    {
                        !isAnswerEdit
                            ? <VideoElement
                                youtubeUrl={props.youtubeAnswerUrl}
                                questionVideoIdStatus={answerVideoIdStatus}
                                questionVideoId={answerVideoId}
                                onQuestionChangeVideo={onAnswerChangeVideo}
                            />
                            : <ApproveCancelTextField
                                tempValue={tempAnswerUrl}
                                setTempValue={setTempAnswerUrl}
                                onApprove={onAnswerApprove}
                                onCancel={onAnswerCancel}
                                label={'Answer Youtube id'}
                            />

                    }

                </div>

            </div>
        </div>
    )
}

type Props = {
    setYoutubeQuestionUrl: (value: string) => void
    setYoutubeAnswerUrl: (value: string) => void
    youtubeQuestionUrl: string
    youtubeAnswerUrl: string
}