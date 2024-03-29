import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fromBase64 } from '@/common/functions.ts'
import { Checkbox } from '@/components/ui/Checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { DeckImgUpload } from '@/components/ui/Dialogs/common/DeckImgUpload.tsx'
import sC from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'
import { DialogsParent } from '@/components/ui/Dialogs/DialogsParent/DialogsParent.tsx'
import { useAppDispatch } from '@/hooks.ts'
import { useCreateDeckMutation } from '@/services/decks/decks.service.ts'
import { updateDecksCurrentPage } from '@/services/decks/decks.slice.ts'

export const DialogAddPack = (props: Props) => {
  const schema = z.object({
    packName: z.string().min(3).max(30),
  })

  type FormValues = z.input<typeof schema>

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
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
    createDeckForm({ formData })
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    props.setOpen(false)
  }

  return (
    <DialogsParent
      title={'Add New Pack'}
      open={props.open}
      setOpen={onClose}
      onButtonAction={onSubmitEmulation}
      actionButtonText={'Add New Pack'}
      isButtonDisable={Object.keys(errors).length > 0}
    >
      <div className={sC.DialogDescription}>
        <div className={sC.dialogElement}>
          <DeckImgUpload cropImg={cropImg} setCropImg={setCropImg} onApproveCallback={() => {}} />
        </div>
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
          <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate} />
        </div>
      </div>
    </DialogsParent>
  )
}

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
