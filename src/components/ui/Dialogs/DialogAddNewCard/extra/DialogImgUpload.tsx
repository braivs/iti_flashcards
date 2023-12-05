import {Typography} from "@/components/ui/Typography"
import s from "@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.module.scss"
import {Button} from "@/components/ui/Button"
import imgUpload from "@/assets/icons/imgUpload.svg"
import sT from "@/common/commonStyles/tables.module.scss"
import Cropper, {Area, Point} from "react-easy-crop"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {ChangeEvent, useCallback, useState} from "react"
import {onCrop, onFileChange} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"
import {CropType} from "@/components/ui/Dialogs/DialogAddNewCard/extra/CropTypes.ts"

export const DialogImgUpload = (props: PropsType) => {
  const canvaWidth = 484
  const canvaHeight = 119
  const minSliderValue = 4
  const maxSliderValue = 15
  const sliderStep = 1

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
          ? <>
            {!props.cropQuestionImg
              ? <div className={s.dummyQuestionAnswer}>Plz select question img</div>
              : <div className={s.imgContainer}><img className={s.croppedImg} src={props.cropQuestionImg} alt="cropImg"/></div>
            }
            <Button variant="secondary" onClick={() => {
              setIsEditQuestionPicture(true)
            }} className={s.button}>
              <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
              Change cover
            </Button>
          </>
          : <>
            {(!props.cropQuestionImg || isEditQuestionPicture) &&
                <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileQuestionChangeCallback}/>}
            {inputQuestionImg
              ? <>
                <div className={s.imgContainer}>
                  <Cropper
                    image={inputQuestionImg}
                    crop={cropQuestion}
                    zoom={zoomQuestion}
                    cropSize={{width: canvaWidth, height: canvaHeight}}
                    onCropChange={onCropQuestionChange}
                    onCropComplete={onCropQuestionComplete}
                    onZoomChange={onZoomQuestionChange}
                    minZoom={minSliderValue}
                    maxZoom={maxSliderValue}
                    zoomSpeed={sliderStep * 2}
                  />
                </div>
                <SliderSingle
                  defaultValue={minSliderValue}
                  min={minSliderValue}
                  max={maxSliderValue}
                  step={sliderStep}
                  value={sliderQuestionValue[0]}
                  onValueChange={sliderQuestionChangeHandler}
                />
                <Button onClick={onApproveQuestion}>Approve</Button>
              </>
              : <>
                <div className={s.dummyQuestionAnswer}>Plz select question img</div>
              </>
            }
          </>
      }

      <Typography variant={'Body_2'}>Answer:</Typography>
      {
        !isEditAnswerPicture
          ? <>
            {!props.cropAnswerImg
              ? <div className={s.dummyQuestionAnswer}>Plz select question img</div>
              : <div className={s.imgContainer}><img className={s.croppedImg} src={props.cropAnswerImg} alt="cropImg"/></div>
            }
            <Button variant="secondary" onClick={() => {
              setIsEditAnswerPicture(true)
            }} className={s.button}>
              <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
              Change cover
            </Button>
          </>
          : <>
            {(!props.cropAnswerImg || isEditAnswerPicture) &&
                <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileAnswerChangeCallback}/>}
            {inputAnswerImg
              ? <>
                <div className={s.imgContainer}>
                  <Cropper
                    image={inputAnswerImg}
                    crop={cropAnswer}
                    zoom={zoomAnswer}
                    cropSize={{width: canvaWidth, height: canvaHeight}}
                    onCropChange={onCropAnswerChange}
                    onCropComplete={onCropAnswerComplete}
                    onZoomChange={onZoomAnswerChange}
                    minZoom={minSliderValue}
                    maxZoom={maxSliderValue}
                    zoomSpeed={sliderStep * 2}
                  />
                </div>
                <SliderSingle
                  defaultValue={minSliderValue}
                  min={minSliderValue}
                  max={maxSliderValue}
                  step={sliderStep}
                  value={sliderAnswerValue[0]}
                  onValueChange={sliderAnswerChangeHandler}
                />
                <Button onClick={onApproveAnswer}>Approve</Button>
              </>
              : <>
                <div className={s.dummyQuestionAnswer}>Plz select question img</div>
              </>
            }
          </>
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