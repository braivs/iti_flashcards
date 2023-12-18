import {Dispatch, SetStateAction, useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Checkbox} from '@/components/ui/Checkbox'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import {DialogsParrent} from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import {useAppDispatch} from '@/hooks.ts'
import {useCreateDeckMutation} from '@/services/decks/decks.service.ts'
import {updateDecksCurrentPage} from '@/services/decks/decks.slice.ts'
import {DialogAddPackImgUpload} from "@/components/ui/Dialogs/DialogAddPackImgUpload.tsx"
import {fromBase64} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"

export const DialogAddPack = (props: PropsType) => {
  const schema = z.object({
    packName: z.string().min(3).max(30),
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
      packName: '',
    },
  })

  const formRef = useRef<HTMLFormElement | null>(null)
  // this is temporary here
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [cropImg, setCropImg] = useState<string | undefined>(undefined)

  const dispatch = useAppDispatch()
  const [createDeckForm] = useCreateDeckMutation()

  const handleFormSubmitted = handleSubmit(values => {
    onAddDeck(values.packName)
    reset()
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  async function onAddDeck(packName: string) {
    if (!packName) return
    const formData = new FormData()
    const deckCoverImg = await fromBase64(cropImg ? cropImg : '')
    formData.append('name', packName)
    formData.append('isPrivate', JSON.stringify(isPrivate))
    if (deckCoverImg) {
      formData.append('cover', deckCoverImg)
    }
    dispatch(updateDecksCurrentPage(1))
    createDeckForm({formData})
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    props.setOpen(false)
  }

  return (
    <DialogsParrent
      title={'Add New Pack'}
      open={props.open}
      setOpen={onClose}
      onButtonAction={onSubmitEmulation}
      actionButtonText={'Add New Pack'}
      isButtonDisable={Object.keys(errors).length > 0}
    >
      <div className={sC.DialogDescription}>
        <div className={sC.dialogElement}><DialogAddPackImgUpload cropImg={cropImg} setCropImg={setCropImg}/></div>
        <div className={sC.dialogElement}>
          <form ref={formRef}>
            <ControlledTextField
              name={'packName'}
              placeholder={'Lucky pack'}
              label={'Name Pack'}
              control={control}
            />
          </form>
        </div>
        <div className={sC.dialogElement}>
          <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate}/>
        </div>

      </div>
    </DialogsParrent>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
