import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Cropper, { Area, Point } from 'react-easy-crop'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './DialogAddNewCard.module.scss'

import { Button } from '@/components/ui/Button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import { DialogsCommon } from '@/components/ui/Dialogs/DialogsCommon.tsx'
import { Select } from '@/components/ui/Select'
import { SliderSingle } from '@/components/ui/SliderSingle/SliderSingle.tsx'
import { Typography } from '@/components/ui/Typography'
import { useCreateCardInDeckMutation } from '@/services/decks/decks.service.ts'

export const DialogAddNewCard = (props: PropsType) => {
  const minSliderValue = 1
  const maxSliderValue = 10
  const sliderStep = 1
  const canvaWidth = 484
  const canvaHeight = 119

  const [value, setValue] = useState('Text') // for select
  const [inputImg, setInputImg] = useState<null | string>(null)
  const arr: Array<string> = ['Text', 'Picture'] // for select
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 }) // for img upload
  const [zoom, setZoom] = useState(minSliderValue) // for img upload
  const [cropArea, setCropArea] = useState<null | CropType>(null) // for img upload
  const [imgName, setImgName] = useState('')
  const [cropImg, setCropImg] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([minSliderValue])

  const schema = z.object({
    answer: z.string().min(3),
    question: z.string().min(3),
  })

  type FormValues = z.input<typeof schema>

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      answer: '',
      question: '',
    },
  })
  const [createDeck] = useCreateCardInDeckMutation()

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleFormSubmitted = handleSubmit(values => {
    onAddNewCard(values.question, values.answer)
    reset()
    props.setOpen(false)
  })

  // on submit form emulation
  const onSubmitEmulation = () => {
    if (!formRef.current) return
    formRef.current.submit = handleFormSubmitted
    formRef.current.submit()
  }

  const onAddNewCard = (question: string, answer: string) => {
    if (!question || !answer || !props.deckId) return
    createDeck({
      deckId: props.deckId,
      data: {
        question,
        answer,
      },
    })
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    props.setOpen(false)
  }

  const setDialogVariantCallback = (value: string) => {
    setValue(value)
  }

  // create the image with a src of the base64 string
  const createImage = (url: string): Promise<CanvasImageSource> =>
    new Promise((resolve, reject) => {
      const image = new Image()

      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, crop: CropType): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = canvaWidth
    canvas.height = canvaHeight

    ctx &&
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      )

    return canvas.toDataURL('image/jpeg')
  }

  const onCropImg = async () => {
    if (cropArea && inputImg) {
      const img = await getCroppedImg(inputImg, cropArea)

      setCropImg(img)
    }
  }

  const onCropComplete = (croppedAreaPixels: Area) => {
    setCropArea({
      x: croppedAreaPixels.x,
      y: croppedAreaPixels.y,
      width: croppedAreaPixels.width,
      height: croppedAreaPixels.height,
    })
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setImgName(file.name)
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setInputImg(reader.result as string)
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }

  const sliderChangeHandler = (newValue: number[]) => {
    setZoom(newValue[0])
    setSliderValue(newValue)
  }

  const onCropChange = (location: Point) => {
    setCrop(location)
  }

  function onZoomChange(value: number) {
    setZoom(value)
    setSliderValue([value])
  }

  return (
    <DialogsCommon
      title={'Add New Card'}
      open={props.open}
      setOpen={onClose}
      onButtonAction={onSubmitEmulation}
      actionButtonText={'Add New Card'}
      isButtonDisable={Object.keys(errors).length > 0}
    >
      <div className={sC.DialogDescription}>
        <div className={sC.dialogElement}>
          <Select
            options={arr}
            onChangeOption={setDialogVariantCallback}
            label={'Choose a question format'}
            isGreyColor={true}
            name={'dialogSelect'}
            value={value}
          />
        </div>
        {value === 'Text' ? (
          <>
            <form ref={formRef}>
              <div className={sC.textFieldContainer}>
                <div className={sC.element}>
                  <ControlledTextField
                    name={'question'}
                    placeholder={'type a question'}
                    label={'Question'}
                    control={control}
                  />
                </div>
              </div>
              <div className={sC.textFieldContainer}>
                <div className={sC.element}>
                  <ControlledTextField
                    name={'answer'}
                    placeholder={'type an answer'}
                    label={'Answer'}
                    control={control}
                  />
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <Typography variant={'Body_2'}>Question:</Typography>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileChange} />
            <div className={s.uploadContainer}>
              <div className={s.imgContainer}>
                {inputImg ? (
                  <Cropper
                    image={inputImg}
                    crop={crop}
                    zoom={zoom}
                    cropSize={{ width: canvaWidth, height: canvaHeight }}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                    minZoom={minSliderValue}
                    maxZoom={maxSliderValue}
                    zoomSpeed={sliderStep * 2}
                  />
                ) : (
                  <div className={s.dummyImg}>Select question picture</div>
                )}
              </div>
              {inputImg && (
                <>
                  <SliderSingle
                    defaultValue={minSliderValue}
                    min={minSliderValue}
                    max={maxSliderValue}
                    step={sliderStep}
                    value={sliderValue[0]}
                    onValueChange={sliderChangeHandler}
                  />
                </>
              )}
            </div>
            <div className={s.uploadContainer}>
              <div className={s.imgContainer}>
                {cropImg ? (
                  <img className={s.croppedImg} src={cropImg} alt="cropImg" />
                ) : (
                  <div className={s.dummyImg}>cropped dummy</div>
                )}
              </div>
              <Button onClick={onCropImg}>Change Cover</Button>
            </div>
            {/*<Typography variant={'Body_2'}>Answer:</Typography>*/}
          </>
        )}
      </div>
    </DialogsCommon>
  )
}

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  deckId: string
}

//todo: maybe reduce code duplication with DialogAddPack

type CropType = {
  x: number
  y: number
  width: number
  height: number
}
