import sC from "@/components/ui/Dialogs/DialogsCommon/DialogsCommon.module.scss"
import Cropper, {Area, Point} from "react-easy-crop"
import {
  canvaHeight,
  canvaWidth,
  maxSliderValue,
  minSliderValue, sliderStep
} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonData.ts"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {Button} from "@/components/ui/Button"
import {ChangeEvent} from "react"
import s from "@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.module.scss"
import imgUpload from "@/assets/icons/imgUpload.svg"
import sT from "@/common/commonStyles/tables.module.scss"

export const ComboFileCropperSliderApprove = (props: ComboFileCropperSliderApprovePropsType) => {
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

export const ComboCropImgDummyChangeCover = (props: ComboCropImgDummyChangeCoverType) => {
  return (
    <>
      {!props.cropImg
        ? <div className={sC.dummyImg}>{props.cropSuggestionText}</div>
        : <div className={sC.imgContainer}><img className={s.croppedImg} src={props.cropImg} alt="cropImg"/></div>
      }
      <Button variant="secondary" onClick={() => {
        props.setIsEditPicture(true)
      }} className={s.button}>
        <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
        Change cover
      </Button>
    </>
  )
}

type ComboFileCropperSliderApprovePropsType = {
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

type ComboCropImgDummyChangeCoverType = {
  cropImg: string | undefined
  setIsEditPicture: (value: boolean) => void
  cropSuggestionText: string
}