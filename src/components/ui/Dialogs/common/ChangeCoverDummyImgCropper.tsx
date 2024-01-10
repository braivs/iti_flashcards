import sC from "@/components/ui/Dialogs/common/Dialogs.module.scss"
import s from "@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.module.scss"
import Cropper, {Area, Point} from "react-easy-crop"
import {
    canvaHeight,
    canvaWidth,
    maxSliderValue,
    minSliderValue,
    sliderStep
} from "@/components/ui/Dialogs/common/DialogsData.ts"
import {SliderSingle} from "@/components/ui/SliderSingle/SliderSingle.tsx"
import {Button} from "@/components/ui/Button"
import {ChangeEvent} from "react"
import {CustomFileUpload} from "@/components/ui/Dialogs/common/CustomFileUpload.tsx"

export const ChangeCoverDummyImgCropper = (props: ExtraChangeCoverDummyImgCropperProps) => {
    return (
        <>
            {!props.inputImg ? (
                <>
                    {
                        !props.file.cropImg
                            ? <div className={sC.dummyImg}>{props.cropSuggestionText}</div>
                            : <div className={sC.imgContainer}>
                                <img className={s.croppedImg} src={props.file.cropImg} alt="cropImg"/>
                            </div>
                    }

                </>
            ) : (
                <>
                    {!props.file.cropImg ? (
                        <>
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
                                <Button onClick={props.onApprove} variant="secondary" className={sC.halfButton}>
                                    Approve
                                </Button>
                                <Button onClick={props.onCancel} variant="secondary" className={sC.halfButton}>
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className={sC.imgContainer}>
                            <img className={s.croppedImg} src={props.file.cropImg} alt="cropImg"/>
                        </div>
                    )}
                </>
            )}
            {(!props.inputImg || props.file.cropImg) && (
                <CustomFileUpload onFileChangeCallback={props.file.onFileChangeCallback}/>
            )}
        </>
    )
}

type ExtraChangeCoverDummyImgCropperProps = {
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