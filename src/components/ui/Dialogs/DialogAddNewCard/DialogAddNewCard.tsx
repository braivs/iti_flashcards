import { Dispatch, SetStateAction } from 'react'

import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { Textfield } from '@/components/ui/Textfield'

export const DialogAddNewCard = (props: PropsType) => {
  return (
    <DialogsCommon
      title={'Add New Card'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={props.onAddNewCard}
      actionButtonText={'Add New Card'}
    >
      <div className={sC.DialogDescription}>
        <div className={sC.textFieldContainer}>
          <Textfield
            label={'Question'}
            onChange={e => props.onChangeQuestion(e.currentTarget.value)}
            value={props.question}
          />
        </div>
        <div className={sC.textFieldContainer}>
          <Textfield
            label={'Answer'}
            onChange={e => props.onChangeAnswer(e.currentTarget.value)}
            value={props.answer}
          />
        </div>
      </div>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  question: string
  answer: string
  onChangeQuestion: (value: string) => void
  onChangeAnswer: (value: string) => void
  onAddNewCard: () => void
}
