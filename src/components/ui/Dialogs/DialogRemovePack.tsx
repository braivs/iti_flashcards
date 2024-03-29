import * as RDialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'

import { SelectedDeck } from '@/common/types.ts'
import sC from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'
import { DialogsParent } from '@/components/ui/Dialogs/DialogsParent/DialogsParent.tsx'
import { useDeleteDeckMutation } from '@/services/decks/decks.service.ts'

export const DialogRemovePack = (props: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const navigate = useNavigate()
  const onDeleteDeck = () => {
    deleteDeck({ id: props.selectedDeck.id })
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        alert(err?.data?.message)
      })
    props.setSelectedDeck({ id: '', name: '', cover: '' })
    props.setOpen(false)
  }

  return (
    <DialogsParent
      title={'Delete Pack'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={onDeleteDeck}
      actionButtonText={'Delete pack'}
    >
      <RDialog.Description className={sC.DialogDescription}>
        Do you really want to remove <b>{props.selectedDeck.name}</b>?
        <br />
        All cards will be deleted.
      </RDialog.Description>
    </DialogsParent>
  )
}

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedDeck: SelectedDeck
  setSelectedDeck: (value: SelectedDeck) => void
}
