import {CropType} from "@/components/ui/Dialogs/DialogAddNewCard/extra/CropTypes.ts"
import {ChangeEvent} from "react"

export const fromBase64 = (url: string) => {
  //todo: fix fileName
  if (url.length === 0) return
  console.log('url: ', url)
  const ext = url.split(';')[0].split('/')[1]

  return fetch(url)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], `fileName.${ext}`, {type: `image/${ext}`})
    })
}

// create the image with a src of the base64 string
export const createImage = (url: string): Promise<CanvasImageSource> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export const getCroppedImg = async (imageSrc: string, crop: CropType, canvaWidth: number, canvaHeight: number): Promise<string> => {
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

export const onCrop = async (
  cropArea: CropType | null,
  inputImg: undefined | string,
  canvaWidth: number,
  canvaHeight: number,
  cropCallback: (img: string) => void) => {
  if (cropArea && inputImg) {
    const img = await getCroppedImg(inputImg, cropArea, canvaWidth, canvaHeight)

    cropCallback(img)
  }
}

export const onFileChange = async (e: ChangeEvent<HTMLInputElement>, setImgCallback: (img: string) => void) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        setImgCallback(reader.result as string)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
}