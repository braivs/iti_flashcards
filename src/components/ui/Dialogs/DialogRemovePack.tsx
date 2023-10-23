import * as RDialog from '@radix-ui/react-dialog'

import { SelectedDeckType } from '@/common/types.ts'
import s from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { useDeleteDeckMutation } from '@/services/decks/decks.service.ts'

export const DialogRemovePack = (props: PropsType) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const onDeleteDeck = () => {
    deleteDeck({ id: props.selectedDeck.id })
      .unwrap()
      .catch(err => {
        alert(err?.data?.message)
      })
    props.setSelectedDeck({ id: '', name: '' })
    props.setOpen(false)
  }

  return (
    <DialogsCommon
      title={'Delete Pack'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={onDeleteDeck}
      actionButtonText={'Delete pack'}
    >
      <RDialog.Description className={s.DialogDescription}>
        Do you really want to remove <b>{props.selectedDeck.name}</b>?
        <br />
        All cards will be deleted.
      </RDialog.Description>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedDeck: SelectedDeckType
  setSelectedDeck: (value: SelectedDeckType) => void
}
