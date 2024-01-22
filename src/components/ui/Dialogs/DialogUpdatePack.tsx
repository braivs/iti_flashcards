import {useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {SelectedDeck} from '@/common/types.ts'
import {Checkbox} from '@/components/ui/Checkbox'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'
import {DialogsParent} from '@/components/ui/Dialogs/DialogsParent/DialogsParent.tsx'
import {useAppDispatch} from '@/hooks.ts'
import {useUpdateDeckMutation} from '@/services/decks/decks.service.ts'
import {updateDecksCurrentPage} from '@/services/decks/decks.slice.ts'
import {DeckImgUpload} from "@/components/ui/Dialogs/common/DeckImgUpload.tsx"
import {fromBase64} from "@/common/functions.ts"

export const DialogUpdatePack = (props: Props) => {
    const schema = z.object({
        cover: z.string(),
        name: z.string().min(3).max(30),
        isPrivate: z.boolean(),
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
            name: props.selectedDeck.name,
            isPrivate: props.selectedDeck.isPrivate,
            cover: props.selectedDeck.cover
        },
    })

    const formRef = useRef<HTMLFormElement | null>(null)

    const [isPrivate, setIsPrivate] = useState<boolean>(props.selectedDeck.isPrivate ? props.selectedDeck.isPrivate : false)
    const [cropImg, setCropImg] = useState<string | undefined>(props.selectedDeck.cover)
    const [isCoverChanged, setIsCoverChanged] = useState(false)

    const dispatch = useAppDispatch()
    const [updateDeck] = useUpdateDeckMutation()


    const handleFormSubmitted = handleSubmit(values => {
        onUpdateDeck(values.name, isPrivate, cropImg)
            .then(() => {
                reset()
                props.setOpen(false)
            }).catch(() => {
            console.error('handleFormSubmitted error')
        })

    })

    // on submit form emulation
    const onSubmitEmulation = () => {
        if (!formRef.current) return
        formRef.current.submit = handleFormSubmitted
        formRef.current.submit()
    }

    const onUpdateDeck = async (name: string, isPrivate: boolean, cover?: string) => {
        if (!name || !props.deckId) return

        // Check if any of the properties has changed
        const isNameChanged = props.name !== name
        const isPrivateChanged = props.isPrivate !== isPrivate


        if (isNameChanged || isPrivateChanged || isCoverChanged) {
            const formData = new FormData()

            dispatch(updateDecksCurrentPage(1))

            // Prepare the data object with only the changed properties
            if (isNameChanged) {
                formData.append('name', name)
            }

            if (isPrivateChanged) {
                formData.append('isPrivate', JSON.stringify(isPrivate))
            }

            if (isCoverChanged) {
                const coverImg = await fromBase64(cover ? cover : '')
                if (coverImg) formData.append('cover', coverImg)
            }
            updateDeck({
                deckId: props.deckId,
                formData,
            })
        }

        props.setOpen(false)
    }

    const onClose = () => {
        reset()
        props.setOpen(false)
    }

    const onApprove = () => {
        setIsCoverChanged(true)
    }

    return (
        <DialogsParent
            title={'Edit Pack'}
            open={props.open}
            setOpen={onClose}
            onButtonAction={onSubmitEmulation}
            actionButtonText={'Save Changes'}
            isButtonDisable={Object.keys(errors).length > 0}
        >
            <div className={sC.DialogDescription}>
                <div className={sC.dialogElement}>
                    <DeckImgUpload cropImg={cropImg} setCropImg={setCropImg} onApproveCallback={onApprove}/>
                </div>

            </div>
            <form ref={formRef}>
                <div className={sC.DialogDescription}>
                    <div className={sC.elementContainer}>
                        <div className={sC.element}>
                            <ControlledTextField name={'name'} label={'Name Pack'} control={control}/>
                        </div>
                    </div>
                    <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate}/>
                </div>
            </form>
        </DialogsParent>
    )
}

type Props = {
    open: boolean
    name: string
    isPrivate?: boolean
    setIsPrivate: (test: any) => void
    setOpen: (value: boolean) => void
    selectedDeck: SelectedDeck
    setSelectedDeck: (value: SelectedDeck) => void
    deckId: string
}
