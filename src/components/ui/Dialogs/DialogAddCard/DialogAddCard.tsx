import {Dispatch, SetStateAction, useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import {CardImgUpload} from '@/components/ui/Dialogs/common/CardImgUpload.tsx'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import {DialogsParrent} from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import {Select} from '@/components/ui/Select'
import {useCreateCardInDeckMutation} from '@/services/decks/decks.service.ts'
import {fromBase64} from "@/common/functions.ts"

export const DialogAddCard = (props: PropsType) => {
    const arr: Array<string> = ['Text + Picture', 'Video'] // for select

    const [value, setValue] = useState('Text + Picture') // for select
    const [cropQuestionImg, setCropQuestionImg] = useState<string | undefined>(undefined)
    const [cropAnswerImg, setCropAnswerImg] = useState<string | undefined>(undefined)

    const schema = z.object({
        answer: z.string().min(3),
        question: z.string().min(3),
    })

    type FormValues = z.input<typeof schema>

    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: {
            answer: '',
            question: '',
        },
    })
    const [createCardInDeck] = useCreateCardInDeckMutation()

    const formRef = useRef<HTMLFormElement | null>(null)

    const handleFormSubmitted = handleSubmit(values => {
        onAddNewCard(values.question, values.answer).then()
        reset()
        props.setOpen(false)
    })

    // on submit form emulation
    const onSubmitEmulation = () => {
        if (!formRef.current) return
        formRef.current.submit = handleFormSubmitted
        formRef.current.submit()
    }

    const onAddNewCard = async (question: string, answer: string) => {
        if (!question || !answer || !props.deckId) return
        const formData = new FormData()
        const questionImg = await fromBase64(cropQuestionImg ? cropQuestionImg : '')
        const answerImg = await fromBase64(cropAnswerImg ? cropAnswerImg : '')

        formData.append('question', question)
        formData.append('answer', answer)
        if (questionImg) {
            formData.append('questionImg', questionImg)
        }
        if (answerImg) {
            formData.append('answerImg', answerImg)
        }
        createCardInDeck({
            deckId: props.deckId,
            formData,
        })
        props.setOpen(false)
    }

    const onClose = () => {
        reset()
        setCropQuestionImg(undefined)
        setCropAnswerImg(undefined)
        props.setOpen(false)
    }

    const setDialogVariantCallback = (value: string) => {
        setValue(value)
    }



    return (
        <DialogsParrent
            title={'Add New Card'}
            open={props.open}
            setOpen={onClose}
            onButtonAction={onSubmitEmulation}
            actionButtonText={'Add New Card'}
            isButtonDisable={Object.keys(errors).length > 0}
        >
            <div className={sC.DialogDescription}>
                <div className={sC.dialogElement}>
                    <Select
                        options={arr}
                        onChangeOption={setDialogVariantCallback}
                        label={'Choose a question format'}
                        isGreyColor={true}
                        name={'dialogSelect'}
                        value={value}
                    />
                </div>
                <form ref={formRef}>
                    <div className={sC.textFieldContainer}>
                        <div className={sC.element}>
                            <ControlledTextField
                                name={'question'}
                                placeholder={'interesting question'}
                                label={'Question'}
                                control={control}
                            />
                        </div>
                    </div>
                    <div className={sC.textFieldContainer}>
                        <div className={sC.element}>
                            <ControlledTextField
                                name={'answer'}
                                placeholder={'simple answer'}
                                label={'Answer'}
                                control={control}
                            />
                        </div>
                    </div>
                </form>
                <CardImgUpload
                    cropQuestionImg={cropQuestionImg}
                    cropAnswerImg={cropAnswerImg}
                    setCropQuestionImg={setCropQuestionImg}
                    setCropAnswerImg={setCropAnswerImg}
                    onApproveAnswerCallback={() => {}}
                    onApproveQuestionCallback={() => {}}
                />

            </div>
        </DialogsParrent>
    )
}

type PropsType = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    deckId: string
}
