import {useEffect, useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {SelectedCardUpdate} from '@/common/types.ts'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import {DialogsParrent} from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import {useUpdateCardMutation} from '@/services/cards/cards.service.ts'
import {CardImgUpload} from "@/components/ui/Dialogs/common/CardImgUpload.tsx"
import {fromBase64} from "@/common/functions.ts"

export const DialogUpdateCard = (props: Props) => {
    const [isCoverQuestionChanged, setIsCoverQuestionChanged] = useState(false)
    const [isCoverAnswerChanged, setIsCoverAnswerChanged] = useState(false)
    const [cropQuestionImg, setCropQuestionImg] = useState<string | undefined>(props.selectedCard.questionImg)
    const [cropAnswerImg, setCropAnswerImg] = useState<string | undefined>(props.selectedCard.answerImg)
    const [youtubeQuestionUrl, setYoutubeQuestionUrl] = useState(props.selectedCard.questionVideo)
    const [youtubeAnswerUrl, setYoutubeAnswerUrl] = useState(props.selectedCard.answerVideo)

    const schema = z.object({
        question: z.string().min(2).max(500),
        answer: z.string().min(2).max(500),
    })

    type FormValues = z.input<typeof schema>

    useEffect(() => {
        console.log('youtubeQuestionUrl', youtubeQuestionUrl, 'youtubeAnswerUrl', youtubeAnswerUrl)
    }, [youtubeQuestionUrl, youtubeAnswerUrl]) // temp

    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: {
            question: props.selectedCard.question,
            answer: props.selectedCard.answer,
        },
    })

    const formRef = useRef<HTMLFormElement | null>(null)

    const [updateCard] = useUpdateCardMutation()

    const handleFormSubmitted = handleSubmit(values => {
        onUpdateCard(values.question, values.answer, cropQuestionImg, cropAnswerImg)
            .then(() => {
                reset()
                props.setOpen(false)
            })
            .catch(() => {
                console.error('handleFormSubmitted error')
            })
    })

    // on submit form emulation
    const onSubmitEmulation = () => {
        if (!formRef.current) return
        formRef.current.submit = handleFormSubmitted
        formRef.current.submit()
    }

    const onUpdateCard = async (question: string, answer: string, coverQuestionImg?: string, coverAnswerImg?: string) => {
        if (!question || !answer || !props.id) return

        // Check if either question or answer has changed
        const isQuestionChanged = props.question !== question
        const isAnswerChanged = props.answer !== answer

        if (isQuestionChanged || isAnswerChanged || isCoverQuestionChanged || isCoverAnswerChanged) {
            const formData = new FormData()

            // Prepare the data object with only the changed properties
            if (isQuestionChanged) {
                formData.append('question', question)
            }
            if (isAnswerChanged) {
                formData.append('answer', answer)
            }
            if (isCoverQuestionChanged) {
                const questionImg = await fromBase64(coverQuestionImg ? coverQuestionImg : '')
                if (questionImg) {
                    formData.append('questionImg', questionImg)
                }
            }
            if (isCoverAnswerChanged) {
                const answerImg = await fromBase64(coverAnswerImg ? coverAnswerImg : '')
                if (answerImg) formData.append('answerImg', answerImg)
            }

            updateCard({
                id: props.id,
                formData,
            })
        }

        props.setOpen(false)
    }

    const onClose = () => {
        reset()
        props.setOpen(false)
    }

    const onApproveQuestion = () => {
        setIsCoverQuestionChanged(true)
    }

    const onApproveAnswer = () => {
        setIsCoverAnswerChanged(true)
    }

    return (
        <DialogsParrent
            title={'Edit Card'}
            open={props.open}
            setOpen={onClose}
            onButtonAction={onSubmitEmulation}
            actionButtonText={'Save Changes'}
            isButtonDisable={Object.keys(errors).length > 0}
        >
            <div className={sC.DialogDescription}>
                <form ref={formRef}>
                    <div className={sC.dialogElement}>
                        <div className={sC.textFieldContainer}>
                            <div className={sC.element}>
                                <ControlledTextField name={'question'} label={'Question'} control={control}/>
                            </div>
                        </div>
                        <div className={sC.textFieldContainer}>
                            <div className={sC.element}>
                                <ControlledTextField name={'answer'} label={'Answer'} control={control}/>
                            </div>
                        </div>
                    </div>

                </form>


                <div className={sC.dialogElement}>
                    <CardImgUpload
                        cropQuestionImg={cropQuestionImg}
                        cropAnswerImg={cropAnswerImg}
                        setCropQuestionImg={setCropQuestionImg}
                        setCropAnswerImg={setCropAnswerImg}
                        onApproveAnswerCallback={onApproveAnswer}
                        onApproveQuestionCallback={onApproveQuestion}
                    />
                </div>
            </div>
        </DialogsParrent>
    )
}

type Props = {
    id: string
    question: string
    answer: string
    open: boolean
    setOpen: (value: boolean) => void
    selectedCard: SelectedCardUpdate
    setSelectedCard: (value: SelectedCardUpdate) => void
}
