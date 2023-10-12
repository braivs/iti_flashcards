import { Dispatch, SetStateAction } from 'react'

import s from './DialogAddPack.module.scss'

import { Checkbox } from '@/components/ui/Checkbox'
import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { Textfield } from '@/components/ui/Textfield'

export const DialogAddPack = (props: PropsType) => {
  return (
    <DialogsCommon
      title={'Add New Pack'}
      open={props.open}
      setOpen={props.setOpen}
      onButtonAction={props.onAdd}
      actionButtonText={'Add New Pack'}
    >
      <div className={sC.DialogDescription}>
        <div className={s.textFieldContainer}>
          <Textfield
            label={'Name Pack'}
            onChange={e => props.onChangeNewPackName(e.currentTarget.value)}
            value={props.newPackName}
          />
        </div>
        <Checkbox
          label={'Private pack'}
          checked={props.isPrivate}
          onValueChange={props.setIsPrivate}
        />
      </div>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  newPackName: string
  onAdd: () => void
  onChangeNewPackName: (newPackName: string) => void
  isPrivate: boolean
  setIsPrivate: (isPrivate: boolean) => void
}
