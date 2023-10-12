import { Dispatch, SetStateAction } from 'react'

import * as RDialog from '@radix-ui/react-dialog'

import s from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'

export const DialogRemovePack = (props: PropsType) => {
  return (
    <DialogsCommon
      title={'Delete Pack'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={props.onDelete}
      actionButtonText={'Delete pack'}
    >
      <RDialog.Description className={s.DialogDescription}>
        Do you really want to remove <b>{props.packName}</b>?
        <br />
        All cards will be deleted.
      </RDialog.Description>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  packName: string
  onDelete: () => void
}
