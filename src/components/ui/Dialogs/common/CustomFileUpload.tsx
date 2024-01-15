import { ChangeEvent, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import s from '@/components/ui/Dialogs/DialogAddCard/DialogAddCard.module.scss'
import imgUpload from '@/assets/icons/imgUpload.svg'
import sT from '@/common/commonStyles/tables.module.scss'

export const CustomFileUpload = (props: CustomFileUploadProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const onButtonClick = () => {
    inputFile.current?.click()
  }

  return (
    <>
      <input
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept=".jpg, .jpeg, .png"
        onChange={props.onFileChangeCallback}
      />
      <Button variant="secondary" onClick={onButtonClick} className={s.button}>
        <img src={imgUpload} alt="trashIcon" className={sT.trashIcon} />
        Change cover
      </Button>
    </>
  )
}

export type CustomFileUploadProps = {
  onFileChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
}
