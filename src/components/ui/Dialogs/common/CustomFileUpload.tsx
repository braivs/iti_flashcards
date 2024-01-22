import { ChangeEvent, useRef } from 'react'

import imgUpload from '@/assets/icons/imgUpload.svg'
import { Button } from '@/components/ui/Button'
import sC from '@/components/ui/Dialogs/common/Dialogs.module.scss'

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
      <Button variant="secondary" onClick={onButtonClick} className={sC.button}>
        <img src={imgUpload} alt="trashIcon" />
        Change cover
      </Button>
    </>
  )
}

export type CustomFileUploadProps = {
  onFileChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
}
