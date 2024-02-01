import { ReactNode } from 'react'

import * as RDialog from '@radix-ui/react-dialog'

import closeIcon from '@/assets/icons/close.png'
import { Button } from '@/components/ui/Button'
import s from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'

export const DialogsParent = (props: Props) => {
  const { isButtonDisable = false } = props

  return (
    <RDialog.Root open={props.open} onOpenChange={props.setOpen} >
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
          <div className={s.children}>
            {props.children(<div className={s.buttonContainer}>
              <RDialog.Close asChild>
                <Button className={s.buttonCancel}>Cancel</Button>
              </RDialog.Close>
              <Button onClick={props.onButtonAction} disabled={isButtonDisable} type={'submit'}>
                {props.actionButtonText}
              </Button>
            </div>)}
          </div>

        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  )
}

type Props<T extends (buttons: ReactNode) => ReactNode | ReactNode> = {
  open: boolean
  setOpen: (value: boolean) => void
  onButtonAction: () => void
  actionButtonText: string
  children: T
  title: string
  isButtonDisable?: boolean
}
