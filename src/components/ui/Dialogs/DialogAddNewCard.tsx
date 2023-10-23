import { Dispatch, SetStateAction, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { useCreateCardInDeckMutation } from '@/services/decks/decks.service.ts'

export const DialogAddNewCard = (props: PropsType) => {
  const schema = z.object({
    answer: z.string().min(3),
    question: z.string().min(3),
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
      answer: '',
      question: '',
    },
  })
  const [createDeck] = useCreateCardInDeckMutation()

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleFormSubmitted = handleSubmit(values => {
    onAddNewCard(values.question, values.answer)
    reset()
    props.setOpen(false)
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  const onAddNewCard = (question: string, answer: string) => {
    if (!question || !answer || !props.deckId) return
    createDeck({
      deckId: props.deckId,
      data: {
        question,
        answer,
      },
    })
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    props.setOpen(false)
  }

  return (
    <DialogsCommon
      title={'Add New Card'}
      open={props.open}
      setOpen={onClose}
      onButtonAction={onSubmitEmulation}
      actionButtonText={'Add New Card'}
      isButtonDisable={Object.keys(errors).length > 0}
    >
      <form ref={formRef}>
        <div className={sC.DialogDescription}>
          <div className={sC.textFieldContainer}>
            <div className={sC.element}>
              <ControlledTextField
                name={'question'}
                placeholder={'type a question'}
                label={'Question'}
                control={control}
              />
            </div>
          </div>
          <div className={sC.textFieldContainer}>
            <div className={sC.element}>
              <ControlledTextField
                name={'answer'}
                placeholder={'type an answer'}
                label={'Answer'}
                control={control}
              />
            </div>
          </div>
        </div>
      </form>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  deckId: string
}

//todo: maybe reduce code duplication with DialogAddPack
