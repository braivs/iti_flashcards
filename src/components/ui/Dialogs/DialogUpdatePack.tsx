import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectedDeckType } from '@/common/types.ts'
import { Checkbox } from '@/components/ui/Checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import { DialogsParrent } from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import { useAppDispatch } from '@/hooks.ts'
import { useUpdateDeckMutation } from '@/services/decks/decks.service.ts'
import { updateDecksCurrentPage } from '@/services/decks/decks.slice.ts'

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
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      cover: '',
      name: props.selectedDeck.name,
      isPrivate: props.selectedDeck.isPrivate,
    },
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const [updateDeck] = useUpdateDeckMutation()

  const handleFormSubmitted = handleSubmit(values => {
    onUpdateDeck(values.cover, values.name, isPrivate)
    reset()
    props.setOpen(false)
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  const onUpdateDeck = (cover: string, name: string, isPrivate: boolean) => {
    if (!name || !props.deckId) return

    dispatch(updateDecksCurrentPage(1))
    updateDeck({
      deckId: props.deckId,
      data: {
        cover,
        name,
        isPrivate,
      },
    })

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
      <form ref={formRef}>
        <div className={sC.DialogDescription}>
          <div className={sC.textFieldContainer}>
            <div className={sC.element}>
              <ControlledTextField name={'name'} label={'Name Pack'} control={control} />
            </div>
          </div>
          <Checkbox label={'Private pack'} checked={isPrivate} onValueChange={setIsPrivate} />
        </div>
      </form>
    </DialogsParrent>
  )
}

type PropsType = {
  open: boolean
  name: string
  isPrivate?: boolean
  setIsPrivate: (test: any) => void
  setOpen: (value: boolean) => void
  selectedDeck: SelectedDeckType
  setSelectedDeck: (value: SelectedDeckType) => void
  deckId: string
}
