import * as RDialog from '@radix-ui/react-dialog'

import { SelectedCardType } from '@/common/types.ts'
import sC from '@/components/ui/Dialogs/DialogsCommon/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon/DialogsCommon.tsx'
import { useDeleteCardMutation } from '@/services/cards/cards.service.ts'

export const DialogRemoveCard = (props: PropsType) => {
  const [deleteCard] = useDeleteCardMutation()

  const onDeleteCard = () => {
    deleteCard({ id: props.selectedCard.id })
      .unwrap()
      .catch(err => {
        alert(err?.data?.message)
      })
    props.setSelectedCard({ id: '', question: '' })
    props.setOpen(false)
  }

  return (
    <DialogsCommon
      title={'Delete Card'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={onDeleteCard}
      actionButtonText={'Delete Card'}
    >
      <RDialog.Description className={sC.DialogDescription}>
        Do you really want to remove <b>{props.selectedCard.question}</b>?
        <br />
        All cards will be deleted.
      </RDialog.Description>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedCard: SelectedCardType
  setSelectedCard: (value: SelectedCardType) => void
}
