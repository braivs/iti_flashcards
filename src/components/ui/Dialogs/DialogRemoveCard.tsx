import * as RDialog from '@radix-ui/react-dialog'

import { SelectedCard } from '@/common/types.ts'
import sC from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'
import { DialogsParent } from '@/components/ui/Dialogs/DialogsParent/DialogsParent.tsx'
import { useDeleteCardMutation } from '@/services/cards/cards.service.ts'

export const DialogRemoveCard = (props: Props) => {
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
    <DialogsParent
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
    </DialogsParent>
  )
}

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedCard: SelectedCard
  setSelectedCard: (value: SelectedCard) => void
}
