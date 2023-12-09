import {ChangeEvent, useCallback, useState} from "react"
import {onFileChange} from "@/common/functions.ts"
import sC from '@/components/ui/Dialogs/sharedData/sharedStylesDialogs.module.scss'
import Cropper, {Area, Point} from "react-easy-crop"
import {
  canvaHeight,
  canvaWidth,
  maxSliderValue,
  minSliderValue, sliderStep
} from "@/components/ui/Dialogs/sharedData/sharedDataDialogs.ts"
import {CropType} from "@/components/ui/Dialogs/DialogAddNewCard/extra/CropTypes.ts"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {Button} from "@/components/ui/Button"
import {onCrop} from "@/components/ui/Dialogs/DialogAddNewCard/extra/cropFunctions.ts"
import s from "@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.module.scss"
import imgUpload from "@/assets/icons/imgUpload.svg"
import sT from "@/common/commonStyles/tables.module.scss"

export const DialogAddPackImgUpload = (props: PropsType) => {
  const [isEditPicture, setIsEditPicture] = useState(false)
  const [inputImg, setInputImg] = useState<undefined | string>(undefined)
  const [crop, setCrop] = useState<Point>({x: 0, y: 0})
  const [zoom, setZoom] = useState(minSliderValue)
  const [cropArea, setCropArea] = useState<null | CropType>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([minSliderValue])


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
          ? <>
            {!props.cropImg
              ? <div className={sC.dummyImg}>Plz select question img</div>
              : <div className={sC.imgContainer}><img className={s.croppedImg} src={props.cropImg} alt="cropImg"/></div>
            }
            <Button variant="secondary" onClick={() => {
              setIsEditPicture(true)
            }} className={s.button}>
              <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
              Change cover
            </Button>
          </>
          : <>
            {(!props.cropImg || isEditPicture) &&
                <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileChangeCallback}/>}
            {
              inputImg
                ? <>
                  <div className={sC.imgContainer}>
                    <Cropper
                      image={inputImg}
                      crop={crop}
                      zoom={zoom}
                      cropSize={{width: canvaWidth, height: canvaHeight}}
                      onCropChange={onCropChange}
                      onCropComplete={onCropComplete}
                      onZoomChange={onZoomChange}
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
                    value={sliderValue[0]}
                    onValueChange={sliderChangeHandler}
                  />
                  <Button onClick={onApprove}>Approve</Button>
                </>
                : <div className={sC.dummyImg}>Plz select deck img... if you wish</div>
            }
            </>
      }

    </div>
  )
}

type PropsType = {
  cropImg: string | undefined
  setCropImg: (value: string) => void
}