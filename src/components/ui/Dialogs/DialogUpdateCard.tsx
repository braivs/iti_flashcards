import { useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectedCardUpdate } from '@/common/types.ts'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import { DialogsParrent } from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import { useUpdateCardMutation } from '@/services/cards/cards.service.ts'

export const DialogUpdateCard = (props: PropsType) => {
  const schema = z.object({
    question: z.string().min(2).max(500),
    answer: z.string().min(2).max(500),
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
      question: props.selectedCard.question,
      answer: props.selectedCard.answer,
    },
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const [updateCard] = useUpdateCardMutation()

  const handleFormSubmitted = handleSubmit(values => {
    onUpdateCard(values.question, values.answer)
    reset()
    props.setOpen(false)
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  const onUpdateCard = (question: string, answer: string) => {
    if (!question || !answer || !props.id) return

    // Check if either question or answer has changed
    const isQuestionChanged = props.question !== question
    const isAnswerChanged = props.answer !== answer

    if (isQuestionChanged || isAnswerChanged) {
      // Prepare the data object with only the changed properties
      const updatedData: { question?: string; answer?: string } = {}

      if (isQuestionChanged) {
        updatedData.question = question
      }
      if (isAnswerChanged) {
        updatedData.answer = answer
      }

      updateCard({
        id: props.id,
        data: updatedData,
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
      title={'Edite Card'}
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
              <ControlledTextField name={'question'} label={'Question'} control={control} />
            </div>
          </div>
          <div className={sC.textFieldContainer}>
            <div className={sC.element}>
              <ControlledTextField name={'answer'} label={'Answer'} control={control} />
            </div>
          </div>
        </div>
      </form>
    </DialogsParrent>
  )
}

type PropsType = {
  id: string
  question: string
  answer: string
  open: boolean
  setOpen: (value: boolean) => void
  selectedCard: SelectedCardUpdate
  setSelectedCard: (value: SelectedCardUpdate) => void
}
