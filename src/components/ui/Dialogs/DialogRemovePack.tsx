import * as RDialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'

import { SelectedDeck } from '@/common/types.ts'
import sC from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss'
import { DialogsParrent } from '@/components/ui/Dialogs/DialogsParrent/DialogsParrent.tsx'
import { useDeleteDeckMutation } from '@/services/decks/decks.service.ts'

export const DialogRemovePack = (props: PropsType) => {
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
    <DialogsParrent
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
    </DialogsParrent>
  )
}

type PropsType = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedDeck: SelectedDeck
  setSelectedDeck: (value: SelectedDeck) => void
}
