import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Checkbox } from '@/components/ui/Checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { useAppDispatch } from '@/hooks.ts'
import { useCreateDeckMutation } from '@/services/decks/decks.service.ts'
import { updateDecksCurrentPage } from '@/services/decks/decks.slice.ts'

export const DialogAddPack = (props: PropsType) => {
  const schema = z.object({
    packName: z.string().min(3),
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
  const [isPrivate, setIsPrivate] = useState(false)

  const dispatch = useAppDispatch()
  const [createDeck] = useCreateDeckMutation()

  const handleFormSubmitted = handleSubmit(values => {
    onAddDeck(values.packName)
    reset()
    props.setOpen(false)
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  const onAddDeck = (packName: string) => {
    if (!packName) return
    dispatch(updateDecksCurrentPage(1))
    createDeck({ name: packName, isPrivate })
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    props.setOpen(false)
  }

  return (
    <DialogsCommon
      title={'Add New Pack'}
      open={props.open}
      setOpen={onClose}
      onButtonAction={onSubmitEmulation}
      actionButtonText={'Add New Pack'}
      isButtonDisable={Object.keys(errors).length > 0}
    >
      <form ref={formRef}>
        <div className={sC.DialogDescription}>
          <div className={sC.textFieldContainer}>
            <div className={sC.element}>
              <ControlledTextField
                name={'packName'}
                placeholder={'type a pack name'}
                label={'Name Pack'}
                control={control}
              />
            </div>
          </div>
          <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate} />
        </div>
      </form>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

//todo: maybe reduce code duplication with DialogAddNewCard
