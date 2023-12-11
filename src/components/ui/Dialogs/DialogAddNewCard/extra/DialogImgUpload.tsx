import {Typography} from "@/components/ui/Typography"
import {Area, Point} from "react-easy-crop"
import {ChangeEvent, useCallback, useState} from "react"
import {onCrop} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"
import {CropType} from "@/components/ui/Dialogs/DialogAddNewCard/extra/CropTypes.ts"
import {onFileChange} from "@/common/functions.ts"
import {canvaHeight, canvaWidth, minSliderValue} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonData.ts"
import {
  ComboCropImgDummyChangeCover,
  ComboFileCropperSliderApprove
} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonComponents.tsx"

export const DialogImgUpload = (props: PropsType) => {

  const [isEditQuestionPicture, setIsEditQuestionPicture] = useState(false)
  const [isEditAnswerPicture, setIsEditAnswerPicture] = useState(false)
  const [inputAnswerImg, setInputAnswerImg] = useState<undefined | string>(undefined)
  const [inputQuestionImg, setInputQuestionImg] = useState<undefined | string>(undefined)
  const [cropQuestion, setCropQuestion] = useState<Point>({x: 0, y: 0})
  const [zoomQuestion, setZoomQuestion] = useState(minSliderValue)
  const [cropQuestionArea, setCropQuestionArea] = useState<null | CropType>(null)
  const [sliderQuestionValue, setSliderQuestionValue] = useState<number[]>([minSliderValue])
  const [cropAnswer, setCropAnswer] = useState<Point>({x: 0, y: 0})
  const [zoomAnswer, setZoomAnswer] = useState(minSliderValue)
  const [cropAnswerArea, setCropAnswerArea] = useState<null | CropType>(null)
  const [sliderAnswerValue, setSliderAnswerValue] = useState<number[]>([minSliderValue])

  const cropSuggestionTextQuestion = 'Plz select question img'
  const cropSuggestionTextAnswer = 'Plz select answer img'

  const onFileQuestionChangeCallback = async (e: ChangeEvent<HTMLInputElement>) => {
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

  function onApproveQuestion() {
    setIsEditQuestionPicture(false)
    onCrop(cropQuestionArea, inputQuestionImg, canvaWidth, canvaHeight, props.setCropQuestionImg)
      .then()
  }

  const onFileAnswerChangeCallback = async (e: ChangeEvent<HTMLInputElement>) => {
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
        height: croppedAreaPixels.height
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
        height: croppedAreaPixels.height
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
    onCrop(cropAnswerArea, inputAnswerImg, canvaWidth, canvaHeight, props.setCropAnswerImg)
      .then()
  }

  return (
    <>
      <Typography variant={'Body_2'}>Question:</Typography>
      {
        !isEditQuestionPicture
          ? <ComboCropImgDummyChangeCover cropImg={props.cropQuestionImg} setIsEditPicture={setIsEditQuestionPicture} cropSuggestionText={cropSuggestionTextQuestion}/>
          : <ComboFileCropperSliderApprove
            file={ {cropImg: props.cropQuestionImg, isEditPicture: isEditQuestionPicture, onFileChangeCallback: onFileQuestionChangeCallback} }
            inputImg={inputQuestionImg}
            cropper={ {crop: cropQuestion, zoom: zoomQuestion, onCropChange: onCropQuestionChange, onCropComplete: onCropQuestionComplete, onZoomChange: onZoomQuestionChange} }
            slider={ {sliderValue: sliderQuestionValue, sliderChangeHandler: sliderQuestionChangeHandler} }
            onApprove={onApproveQuestion} cropSuggestionText={cropSuggestionTextQuestion}/>
      }

      <Typography variant={'Body_2'}>Answer:</Typography>
      {
        !isEditAnswerPicture
          ? <ComboCropImgDummyChangeCover cropImg={props.cropAnswerImg} setIsEditPicture={setIsEditAnswerPicture} cropSuggestionText={cropSuggestionTextAnswer}/>
          : <ComboFileCropperSliderApprove
              file={ {cropImg: props.cropAnswerImg, isEditPicture: isEditAnswerPicture, onFileChangeCallback: onFileAnswerChangeCallback} }
              inputImg={inputAnswerImg}
              cropper={ {crop: cropAnswer, zoom: zoomAnswer, onCropChange: onCropAnswerChange, onCropComplete: onCropAnswerComplete, onZoomChange: onZoomAnswerChange} }
              slider={ {sliderValue: sliderAnswerValue, sliderChangeHandler: sliderAnswerChangeHandler} }
              onApprove={onApproveAnswer} cropSuggestionText={cropSuggestionTextAnswer}/>
      }
    </>
  )
}

type PropsType = {
  cropQuestionImg: string | undefined
  cropAnswerImg: string | undefined
  setCropQuestionImg: (value: string) => void
  setCropAnswerImg: (value: string) => void
}