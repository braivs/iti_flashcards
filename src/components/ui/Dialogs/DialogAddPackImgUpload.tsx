import {ChangeEvent, useCallback, useState} from "react"
import {onFileChange} from "@/common/functions.ts"
import {Area, Point} from "react-easy-crop"
import {canvaHeight, canvaWidth, minSliderValue} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonData.ts"
import {CropType} from "@/components/ui/Dialogs/DialogAddNewCard/extra/CropTypes.ts"
import {onCrop} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"
import {
  ComboCropImgDummyChangeCover,
  ComboFileCropperSliderApprove
} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonComponents.tsx"

export const DialogAddPackImgUpload = (props: PropsType) => {
  const [isEditPicture, setIsEditPicture] = useState(false)
  const [inputImg, setInputImg] = useState<undefined | string>(undefined)
  const [crop, setCrop] = useState<Point>({x: 0, y: 0})
  const [zoom, setZoom] = useState(minSliderValue)
  const [cropArea, setCropArea] = useState<null | CropType>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([minSliderValue])

  const cropSuggestionText = 'Plz select deck img... if you wish'

  const onFileChangeCallback = async (e: ChangeEvent<HTMLInputElement>) => {
    await onFileChange(e, setInputImg)
  }

  const onCropChange = (location: Point) => {
    setCrop(location)
  }

  const onCropComplete = useCallback(
    // @ts-ignore
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropArea({
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height
      })
    },
    []
  )

  function onZoomChange(value: number) {
    setZoom(value)
    setSliderValue([value])
  }

  const sliderChangeHandler = (newValue: number[]) => {
    setZoom(newValue[0])
    setSliderValue(newValue)
  }

  function onApprove() {
    setIsEditPicture(false)
    onCrop(cropArea, inputImg, canvaWidth, canvaHeight, props.setCropImg)
      .then()
  }

  return (
    <div>
      {
        !isEditPicture
          ? <ComboCropImgDummyChangeCover cropImg={props.cropImg} setIsEditPicture={setIsEditPicture}
                                          cropSuggestionText={cropSuggestionText}/>
          : <ComboFileCropperSliderApprove
            file={{cropImg: props.cropImg, isEditPicture, onFileChangeCallback}}
            inputImg={inputImg}
            cropper={{crop, zoom, onCropChange, onCropComplete, onZoomChange}}
            slider={{sliderValue, sliderChangeHandler}}
            onApprove={onApprove} cropSuggestionText={cropSuggestionText}/>
      }
    </div>
  )
}

type PropsType = {
  cropImg: string | undefined
  setCropImg: (value: string) => void
}