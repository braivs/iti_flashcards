import sC from "@/components/ui/Dialogs/DialogsCommon/DialogsCommon.module.scss"
import Cropper, {Area, Point} from "react-easy-crop"
import {
  canvaHeight,
  canvaWidth,
  maxSliderValue,
  minSliderValue,
  sliderStep
} from "@/components/ui/Dialogs/DialogsCommon/DialogsCommonData.ts"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {Button} from "@/components/ui/Button"
import {ChangeEvent, useRef} from "react"
import s from "@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.module.scss"
import imgUpload from "@/assets/icons/imgUpload.svg"
import sT from "@/common/commonStyles/tables.module.scss"

export const CustomFileUpload = (props: CustomFileUploadProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const onButtonClick = () => {
    inputFile.current?.click()
  }

  return (
    <>
      <input type="file" ref={inputFile} style={{display: 'none'}} accept=".jpg, .jpeg, .png"
             onChange={props.onFileChangeCallback}/>
      <Button variant="secondary" onClick={onButtonClick} className={s.button}>
        <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
        Change cover
      </Button>
    </>
  )
}

export const ComboChangeCoverDummyImgCropper = (props: ComboChangeCoverDummyImgCropperProps) => {

  return (
    <>
      {
       !props.inputImg
            ? <div className={sC.dummyImg}>{props.cropSuggestionText}</div>
            : <>
           {
             !props.file.cropImg
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
                 <div className={sC.container}>
                   <Button onClick={props.onApprove} variant="secondary" className={sC.halfButton}>Approve</Button>
                   <Button onClick={props.onCancel} variant="secondary" className={sC.halfButton}>Cancel</Button>
                 </div>
               </>
               : <div className={sC.imgContainer}><img className={s.croppedImg} src={props.file.cropImg} alt="cropImg"/></div>
           }
         </>
      }
      {(!props.inputImg || props.file.cropImg) && <CustomFileUpload onFileChangeCallback={props.file.onFileChangeCallback}/> }
    </>
  )
}

type ComboChangeCoverDummyImgCropperProps = {
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
  onCancel: () => void
}

type CustomFileUploadProps = {
  onFileChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
}