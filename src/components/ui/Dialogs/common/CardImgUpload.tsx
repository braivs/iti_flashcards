import { ChangeEvent, useCallback, useState } from 'react'

import { Area, Point } from 'react-easy-crop'

import { onFileChange } from '@/common/functions.ts'
import { onCrop } from '@/components/ui/Dialogs/common/cropFunctions.ts'
import { CropType } from '@/components/ui/Dialogs/common/CropTypes.ts'
import {
  canvaHeight,
  canvaWidth,
  minSliderValue,
} from '@/components/ui/Dialogs/common/DialogsData.ts'
import { Typography } from '@/components/ui/Typography'
import {ChangeCoverDummyImgCropper} from "@/components/ui/Dialogs/common/ChangeCoverDummyImgCropper.tsx"

export const CardImgUpload = (props: Props) => {
  const [isEditQuestionPicture, setIsEditQuestionPicture] = useState(false)
  const [isEditAnswerPicture, setIsEditAnswerPicture] = useState(false)
  const [inputAnswerImg, setInputAnswerImg] = useState<undefined | string>(undefined)
  const [inputQuestionImg, setInputQuestionImg] = useState<undefined | string>(undefined)
  const [cropQuestion, setCropQuestion] = useState<Point>({ x: 0, y: 0 })
  const [zoomQuestion, setZoomQuestion] = useState(minSliderValue)
  const [cropQuestionArea, setCropQuestionArea] = useState<null | CropType>(null)
  const [sliderQuestionValue, setSliderQuestionValue] = useState<number[]>([minSliderValue])
  const [cropAnswer, setCropAnswer] = useState<Point>({ x: 0, y: 0 })
  const [zoomAnswer, setZoomAnswer] = useState(minSliderValue)
  const [cropAnswerArea, setCropAnswerArea] = useState<null | CropType>(null)
  const [sliderAnswerValue, setSliderAnswerValue] = useState<number[]>([minSliderValue])


  const cropSuggestionTextQuestion = 'Question image'
  const cropSuggestionTextAnswer = 'Answer image'

  const onFileQuestionChangeCallback = async (e: ChangeEvent<HTMLInputElement>) => {
    props.setCropQuestionImg('')
    await onFileChange(e, setInputQuestionImg)
  }

  const onCropQuestionChange = (location: Point) => {
    setCropQuestion(location)
  }

  function onZoomQuestionChange(value: number) {
    setZoomQuestion(value)
    setSliderQuestionValue([value])
  }

  const sliderQuestionChangeHandler = (newValue: number[]) => {
    setZoomQuestion(newValue[0])
    setSliderQuestionValue(newValue)
  }

  const onFileAnswerChangeCallback = async (e: ChangeEvent<HTMLInputElement>) => {
    props.setCropAnswerImg('')
    await onFileChange(e, setInputAnswerImg)
  }

  const onCropAnswerChange = (location: Point) => {
    setCropAnswer(location)
  }

  const onCropAnswerComplete = useCallback(
    // @ts-ignore
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropAnswerArea({
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      })
    },
    []
  )

  const onCropQuestionComplete = useCallback(
    // @ts-ignore
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropQuestionArea({
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      })
    },
    []
  )

  function onZoomAnswerChange(value: number) {
    setZoomAnswer(value)
    setSliderAnswerValue([value])
  }

  const sliderAnswerChangeHandler = (newValue: number[]) => {
    setZoomAnswer(newValue[0])
    setSliderAnswerValue(newValue)
  }

  function onApproveAnswer() {
    setIsEditAnswerPicture(false)
    onCrop(cropAnswerArea, inputAnswerImg, canvaWidth, canvaHeight, props.setCropAnswerImg).then()
    props.onApproveAnswerCallback()
  }

  function onApproveQuestion() {
    setIsEditQuestionPicture(false)
    onCrop(
        cropQuestionArea,
        inputQuestionImg,
        canvaWidth,
        canvaHeight,
        props.setCropQuestionImg
    ).then()
    props.onApproveQuestionCallback()
  }

  const onCancelQuestion = () => {
    setInputQuestionImg(undefined)
  }

  function onCancelAnswer() {
    setInputAnswerImg(undefined)
  }

  return (
    <>
      <Typography variant={'Body_2'}>Question:</Typography>
      <ChangeCoverDummyImgCropper
        file={{
          cropImg: props.cropQuestionImg,
          isEditPicture: isEditQuestionPicture,
          onFileChangeCallback: onFileQuestionChangeCallback,
        }}
        inputImg={inputQuestionImg}
        cropper={{
          crop: cropQuestion,
          zoom: zoomQuestion,
          onCropChange: onCropQuestionChange,
          onCropComplete: onCropQuestionComplete,
          onZoomChange: onZoomQuestionChange,
        }}
        slider={{
          sliderValue: sliderQuestionValue,
          sliderChangeHandler: sliderQuestionChangeHandler,
        }}
        onApprove={onApproveQuestion}
        cropSuggestionText={cropSuggestionTextQuestion}
        onCancel={onCancelQuestion}
      />

      <Typography variant={'Body_2'}>Answer:</Typography>
      <ChangeCoverDummyImgCropper
        file={{
          cropImg: props.cropAnswerImg,
          isEditPicture: isEditAnswerPicture,
          onFileChangeCallback: onFileAnswerChangeCallback,
        }}
        inputImg={inputAnswerImg}
        cropper={{
          crop: cropAnswer,
          zoom: zoomAnswer,
          onCropChange: onCropAnswerChange,
          onCropComplete: onCropAnswerComplete,
          onZoomChange: onZoomAnswerChange,
        }}
        slider={{ sliderValue: sliderAnswerValue, sliderChangeHandler: sliderAnswerChangeHandler }}
        onApprove={onApproveAnswer}
        cropSuggestionText={cropSuggestionTextAnswer}
        onCancel={onCancelAnswer}
      />
    </>
  )
}

type Props = {
  cropQuestionImg: string | undefined
  cropAnswerImg: string | undefined
  setCropQuestionImg: (value: string) => void
  setCropAnswerImg: (value: string) => void
  onApproveAnswerCallback: () => void
  onApproveQuestionCallback: () => void
}
