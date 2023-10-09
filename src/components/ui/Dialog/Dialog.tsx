import * as RDialog from '@radix-ui/react-dialog'

import s from './Dialog.module.scss'

import closeIcon from '@/assets/icons/close.png'
import { Button } from '@/components/ui/Button'

// renamed branch
export const Dialog = (props: PropsType) => {
  return (
    <RDialog.Root open={props.open} onOpenChange={props.setOpen}>
      <RDialog.Portal>
        <RDialog.Overlay className={s.DialogOverlay} />
        <RDialog.Content className={s.DialogContent}>
          <RDialog.Title className={s.DialogTitle}>
            <div>Delete Pack</div>
            <RDialog.Close asChild>
              <button className={s.IconButton} aria-label="Close">
                <img src={closeIcon} alt="closeIcon" />
              </button>
            </RDialog.Close>
          </RDialog.Title>
          <RDialog.Description className={s.DialogDescription}>
            Do you really want to remove <b>{props.packName}</b>?
            <br />
            All cards will be deleted.
          </RDialog.Description>
          <div className={s.buttonContainer}>
            <RDialog.Close asChild>
              <Button className={s.buttonCancel}>Cancel</Button>
            </RDialog.Close>
            <Button onClick={props.onDelete}>Delete pack</Button>
          </div>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  )
}

type PropsType = {
  open: boolean
  setOpen: (open: boolean) => void
  packName: string
  onDelete: () => void
}
