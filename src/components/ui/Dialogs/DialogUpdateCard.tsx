import { useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectedCardUpdateType } from '@/common/types.ts'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import { DialogsParrent } from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import { useUpdateCardMutation } from '@/services/cards/cards.service.ts'

export const DialogUpdateCard = (props: PropsType) => {
  const schema = z.object({
    //questionImg: z.string(),
    // answerImg: z.string(),
    question: z.string().min(2).max(500),
    answer: z.string().min(2).max(500),
    // questionVideo: z.string(),
    // answerVideo: z.string(),
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
      // questionImg: '',
      // answerImg: '',
      question: props.selectedCard.question,
      answer: props.selectedCard.answer,
      // questionVideo: '',
      // answerVideo: '',
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
    updateCard({
      id: props.id,
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
    <DialogsParrent
      title={'Eddite Card'}
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
  selectedCard: SelectedCardUpdateType
  setSelectedCard: (value: SelectedCardUpdateType) => void
}
