import * as RDialog from '@radix-ui/react-dialog'

import { SelectedCard } from '@/common/types.ts'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import { DialogsParrent } from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
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
    <DialogsParrent
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
    </DialogsParrent>
  )
}

type PropsType = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedCard: SelectedCard
  setSelectedCard: (value: SelectedCard) => void
}
