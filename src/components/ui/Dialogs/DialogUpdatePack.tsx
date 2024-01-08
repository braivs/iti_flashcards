import {useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {SelectedDeck} from '@/common/types.ts'
import {Checkbox} from '@/components/ui/Checkbox'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import {DialogsParrent} from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import {useAppDispatch} from '@/hooks.ts'
import {useUpdateDeckMutation} from '@/services/decks/decks.service.ts'
import {updateDecksCurrentPage} from '@/services/decks/decks.slice.ts'
import {DialogAddPackImgUpload} from "@/components/ui/Dialogs/DialogAddPackImgUpload.tsx"
import {fromBase64} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"

export const DialogUpdatePack = (props: PropsType) => {
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
    const [cropImg, setCropImg] = useState<string>(props.selectedDeck.cover)

    const dispatch = useAppDispatch()
    const [updateDeck] = useUpdateDeckMutation()

    const handleFormSubmitted = handleSubmit(values => {
        onUpdateDeck(values.name, isPrivate, cropImg)
            .then(() => {
                    reset()
                    props.setOpen(false)
                }
            )

    })

    // on submit form emulation
    const onSubmitEmulation = () => {
        if (!formRef.current) return
        formRef.current.submit = handleFormSubmitted
        formRef.current.submit()
    }

    const onUpdateDeck = async (name: string, isPrivate: boolean, cover: string) => {
        if (!name || !props.deckId || !cover) return
        // const formData = new FormData()
        // const coverImg = await fromBase64(cover ? cover : '')

        // Check if any of the properties has changed
        const isNameChanged = props.name !== name
        const isPrivateChanged = props.isPrivate !== isPrivate
        const isCoverChanged = props.cover !== cover

        if (isNameChanged || isPrivateChanged || isCoverChanged) {
            debugger
            dispatch(updateDecksCurrentPage(1))

            // Prepare the data object with only the changed properties
            const updatedData: { name?: string; cover?: string; isPrivate?: boolean } = {}

            if (isNameChanged) {
                updatedData.name = name
                // formData.append('name', name)
            }
            if (isPrivateChanged) {
                updatedData.isPrivate = isPrivate
                // formData.append('isPrivate', isPrivate.toString())
            }
/*            if (isCoverChanged) {
                if (coverImg) {
                    formData.append('cover', coverImg)
                }
            }*/

            // console.log('formData', formData)

            updateDeck({
                deckId: props.deckId,
                data: updatedData
            })
        }

        props.setOpen(false)
    }

    const onClose = () => {
        reset()
        props.setOpen(false)
    }

    return (
        <DialogsParrent
            title={'Edite Pack'}
            open={props.open}
            setOpen={onClose}
            onButtonAction={onSubmitEmulation}
            actionButtonText={'Save Changes'}
            isButtonDisable={Object.keys(errors).length > 0}
        >
            <div className={sC.DialogDescription}>
                <div className={sC.dialogElement}>
                    <DialogAddPackImgUpload cropImg={cropImg} setCropImg={setCropImg}/>
                </div>

            </div>
            <form ref={formRef}>
                <div className={sC.DialogDescription}>
                    <div className={sC.textFieldContainer}>
                        <div className={sC.element}>
                            <ControlledTextField name={'name'} label={'Name Pack'} control={control}/>
                        </div>
                    </div>
                    <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate}/>
                </div>
            </form>
        </DialogsParrent>
    )
}

type PropsType = {
    open: boolean
    name: string
    cover: string
    isPrivate?: boolean
    setIsPrivate: (test: any) => void
    setOpen: (value: boolean) => void
    selectedDeck: SelectedDeck
    setSelectedDeck: (value: SelectedDeck) => void
    deckId: string
}
