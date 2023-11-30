import {ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState} from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import Cropper, {Area, Point} from 'react-easy-crop'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import s from './DialogAddNewCard.module.scss'

import {Button} from '@/components/ui/Button'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field'
import sC from '@/components/ui/Dialogs/DialogsCommon.module.scss'
import {DialogsCommon} from '@/components/ui/Dialogs/DialogsCommon.tsx'
import {Select} from '@/components/ui/Select'
import {SliderSingle} from '@/components/ui/SliderSingle/SliderSingle.tsx'
import {Typography} from '@/components/ui/Typography'
import {useCreateCardInDeckMutation} from '@/services/decks/decks.service.ts'
import imgUpload from '@/assets/icons/imgUpload.svg'
import sT from "@/common/commonStyles/tables.module.scss"

export const DialogAddNewCard = (props: PropsType) => {
  const minSliderValue = 4
  const maxSliderValue = 15
  const sliderStep = 1
  const canvaWidth = 484
  const canvaHeight = 119

  const [value, setValue] = useState('Text') // for select
  const [inputQuestionImg, setInputQuestionImg] = useState<undefined | string>(undefined)
  const [inputAnswerImg, setInputAnswerImg] = useState<undefined | string>(undefined)
  const arr: Array<string> = ['Text', 'Picture'] // for select
  const [cropQuestion, setCropQuestion] = useState<Point>({x: 0, y: 0}) // for img upload
  const [cropAnswer, setCropAnswer] = useState<Point>({x: 0, y: 0}) // for img upload
  const [zoomQuestion, setZoomQuestion] = useState(minSliderValue) // for img upload
  const [zoomAnswer, setZoomAnswer] = useState(minSliderValue) // for img upload
  const [cropQuestionArea, setCropQuestionArea] = useState<null | CropType>(null) // for img upload
  const [cropAnswerArea, setCropAnswerArea] = useState<null | CropType>(null) // for img upload
  const [cropQuestionImg, setCropQuestionImg] = useState<string | undefined>(undefined)
  const [cropAnswerImg, setCropAnswerImg] = useState<string | undefined>(undefined)
  const [sliderQuestionValue, setSliderQuestionValue] = useState<number[]>([minSliderValue])
  const [sliderAnswerValue, setSliderAnswerValue] = useState<number[]>([minSliderValue])
  const [isEditQuestionPicture, setIsEditQuestionPicture] = useState(false)
  const [isEditAnswerPicture, setIsEditAnswerPicture] = useState(false)

  const schema = z.object({
    answer: z.string().min(3).max(500),
    question: z.string().min(3).max(500),
  })

  type FormValues = z.input<typeof schema>

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      answer: '',
      question: '',
    },
  })
  const [createCardInDeck] = useCreateCardInDeckMutation()

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
    createCardInDeck({
      deckId: props.deckId,
      data: {
        question,
        answer,
        questionImg: cropQuestionImg,
        answerImg: cropAnswerImg
      },
    })
    props.setOpen(false)
  }

  const onClose = () => {
    reset()
    setCropQuestionImg(undefined)
    setCropAnswerImg(undefined)
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

  const onCropQuestionImg = async () => {

    if (cropQuestionArea && inputQuestionImg) {
      const img = await getCroppedImg(inputQuestionImg, cropQuestionArea)

      setCropQuestionImg(img)
    }
  }

  const onCropAnswerImg = async () => {

    if (cropAnswerArea && inputAnswerImg) {
      const img = await getCroppedImg(inputAnswerImg, cropAnswerArea)

      setCropAnswerImg(img)
    }
  }

  const onCropQuestionComplete = useCallback(
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

  const onCropAnswerComplete = useCallback(
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

  const onFileQuestionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setInputQuestionImg(reader.result as string)
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }

  const onFileAnswerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setInputAnswerImg(reader.result as string)
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }

  const sliderQuestionChangeHandler = (newValue: number[]) => {
    setZoomQuestion(newValue[0])
    setSliderQuestionValue(newValue)
  }

  const sliderAnswerChangeHandler = (newValue: number[]) => {
    setZoomAnswer(newValue[0])
    setSliderAnswerValue(newValue)
  }

  const onCropQuestionChange = (location: Point) => {
    setCropQuestion(location)
  }

  const onCropAnswerChange = (location: Point) => {
    setCropAnswer(location)
  }

  function onZoomQuestionChange(value: number) {
    setZoomQuestion(value)
    setSliderQuestionValue([value])
  }

  function onZoomAnswerChange(value: number) {
    setZoomAnswer(value)
    setSliderAnswerValue([value])
  }

  function onApproveQuestion() {
    setIsEditQuestionPicture(false)
    onCropQuestionImg()
      .then()
  }

  function onApproveAnswer() {
    setIsEditAnswerPicture(false)
    onCropAnswerImg()
      .then()
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
            {
              !isEditQuestionPicture
                ? <>
                  {!cropQuestionImg
                    ? <div className={s.dummyQuestionAnswer}>Plz select question img</div>
                    : <div className={s.imgContainer}><img className={s.croppedImg} src={cropQuestionImg} alt="cropImg"/></div>
                  }
                  <Button variant="secondary" onClick={() => {
                    setIsEditQuestionPicture(true)
                  }} className={s.button}>
                    <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
                    Change cover
                  </Button>
                </>
                : <>
                  {(!cropQuestionImg || isEditQuestionPicture) && <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileQuestionChange}/>}
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
                        defaultValue={[minSliderValue]}
                        min={minSliderValue}
                        max={maxSliderValue}
                        step={sliderStep}
                        value={[sliderQuestionValue[0]]}
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
                  {!cropAnswerImg
                    ? <div className={s.dummyQuestionAnswer}>Plz select question img</div>
                    : <div className={s.imgContainer}><img className={s.croppedImg} src={cropAnswerImg} alt="cropImg"/></div>
                  }
                  <Button variant="secondary" onClick={() => {
                    setIsEditAnswerPicture(true)
                  }} className={s.button}>
                    <img src={imgUpload} alt="trashIcon" className={sT.trashIcon}/>
                    Change cover
                  </Button>
                </>
              :  <>
                  {(!cropAnswerImg || isEditAnswerPicture) && <input type="file" accept=".jpg, .jpeg, .png" onChange={onFileAnswerChange}/>}
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
                        defaultValue={[minSliderValue]}
                        min={minSliderValue}
                        max={maxSliderValue}
                        step={sliderStep}
                        value={[sliderAnswerValue[0]]}
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


type CropType = {
  x: number
  y: number
  width: number
  height: number
}

//todo: refactor: separate crop functions to another file, combine question & answer to component with variant