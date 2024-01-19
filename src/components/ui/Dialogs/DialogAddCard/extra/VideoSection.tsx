import sP from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import sC from "@/components/ui/Dialogs/common/Dialogs.module.scss"
import {SetVideoById} from "@/components/ui/Dialogs/DialogAddCard/extra/SetVideoById.tsx"
import {MyYouTube} from "@/common/MyYouTube.tsx"
import {useState} from "react"
import {Button} from "@/components/ui/Button"

export const VideoSection = (props: Props) => {
    const [isQuestionEdit, setIsQuestionEdit] = useState(false)
    const [isAnswerEdit, setIsAnswerEdit] = useState(false)

    const [tempQuestionValue, setTempQuestionValue] = useState('')
    const [tempAnswerValue, setTempAnswerValue] = useState('')

    const onQuestionChangeVideo = () => {
        setIsQuestionEdit(true)
    }

    const onAnswerChangeVideo = () => {
        setIsAnswerEdit(true)
    }

    const onQuestionApprove = () => {
        props.setYoutubeQuestionId(tempQuestionValue)
        setIsQuestionEdit(false)
    }

    const onAnswerApprove = () => {
        props.setYoutubeAnswerId(tempAnswerValue)
        setIsAnswerEdit(false)
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
                        ? <>
                            {
                                props.youtubeQuestionId !== ''
                                    ? <>
                                        <MyYouTube videoId={props.youtubeQuestionId}/>
                                        <Button variant="secondary" className={sC.button} onClick={onQuestionChangeVideo}>
                                            Change video
                                        </Button>
                                    </>
                                    : <>
                                        <div className={sC.dummyVideo}>Question video</div>
                                        <Button variant="secondary" className={sC.button} onClick={onQuestionChangeVideo}>
                                            Change video
                                        </Button>
                                    </>
                            }
                        </>
                        : <SetVideoById
                            tempValue={tempQuestionValue}
                            setTempValue={setTempQuestionValue}
                            onApprove={onQuestionApprove}
                            onCancel={onQuestionCancel}
                            label={'Question Youtube id'}
                        />
                }
                <div>
                    {
                        !isAnswerEdit
                            ? <>
                                {props.youtubeAnswerId !== ''
                                    ? <>
                                        <MyYouTube videoId={props.youtubeAnswerId}/>
                                        <Button variant="secondary" className={sC.button} onClick={onAnswerChangeVideo}>
                                            Change video
                                        </Button>
                                    </>
                                    : <>
                                        <div className={sC.dummyVideo}>Answer video</div>
                                        <Button variant="secondary" className={sC.button} onClick={onAnswerChangeVideo}>
                                            Change video
                                        </Button>
                                    </>
                                }
                            </>
                            : <SetVideoById
                                tempValue={tempAnswerValue}
                                setTempValue={setTempAnswerValue}
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
    setYoutubeQuestionId: (value: string) => void
    setYoutubeAnswerId: (value: string) => void
    youtubeQuestionId: string
    youtubeAnswerId: string
}

// todo: reduce code duplication

