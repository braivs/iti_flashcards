import sC from "@/components/ui/Dialogs/sharedData/sharedStylesDialogs.module.scss"
import Cropper, {Area, Point} from "react-easy-crop"
import {
  canvaHeight,
  canvaWidth,
  maxSliderValue,
  minSliderValue, sliderStep
} from "@/components/ui/Dialogs/sharedData/sharedDataDialogs.ts"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {Button} from "@/components/ui/Button"
import {ChangeEvent} from "react"

export const ComboFileCropperSliderApprove = (props: PropsType) => {
  return (
    <>
      {(!props.file.cropImg || props.file.isEditPicture) &&
          <input type="file" accept=".jpg, .jpeg, .png" onChange={props.file.onFileChangeCallback}/>}
      {
        props.inputImg
          ? <>
            <div className={sC.imgContainer}>
              <Cropper
                image={props.inputImg}
                crop={props.cropper.crop}
                zoom={props.cropper.zoom}
                cropSize={{width: canvaWidth, height: canvaHeight}}
                onCropChange={props.cropper.onCropChange}
                onCropComplete={props.cropper.onCropComplete}
                onZoomChange={props.cropper.onZoomChange}
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
              value={props.slider.sliderValue[0]}
              onValueChange={props.slider.sliderChangeHandler}
            />
            <Button onClick={props.onApprove}>Approve</Button>
          </>
          : <div className={sC.dummyImg}>{props.cropSuggestionText}</div>
      }
    </>
  )
}

type PropsType = {
  file: {
    cropImg: string | undefined
    isEditPicture: boolean
    onFileChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
  }
  inputImg: undefined | string
  cropper: {
    crop: Point
    zoom: number
    onCropChange: (location: Point) => void
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
    onZoomChange: (value: number) => void
  }
  slider: {
    sliderValue: number[]
    sliderChangeHandler: (newValue: number[]) => void
  }
  onApprove: () => void
  cropSuggestionText: string
}