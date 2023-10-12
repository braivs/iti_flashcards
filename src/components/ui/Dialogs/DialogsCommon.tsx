import { Dispatch, ReactNode, SetStateAction } from 'react'

import * as RDialog from '@radix-ui/react-dialog'

import closeIcon from '@/assets/icons/close.png'
import { Button } from '@/components/ui/Button'
import s from '@/components/ui/Dialogs/DialogsCommon.module.scss'

export const DialogsCommon = (props: PropsType) => {
  return (
    <RDialog.Root open={props.open} onOpenChange={props.setOpen}>
      <RDialog.Portal>
        <RDialog.Overlay className={s.DialogOverlay} />
        <RDialog.Content className={s.DialogContent}>
          <RDialog.Title className={s.DialogTitle}>
            <div>{props.title}</div>
            <RDialog.Close asChild>
              <button className={s.IconButton} aria-label="Close">
                <img src={closeIcon} alt="closeIcon" />
              </button>
            </RDialog.Close>
          </RDialog.Title>
          {props.children}
          <div className={s.buttonContainer}>
            <RDialog.Close asChild>
              <Button className={s.buttonCancel}>Cancel</Button>
            </RDialog.Close>
            <Button onClick={props.onButtonAction}>{props.actionButtonText}</Button>
          </div>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onButtonAction: () => void
  actionButtonText: string
  children: ReactNode
  title: string
}
