import { ChangeEvent } from 'react'

import { Sort } from '@/services/common/types.ts'

export const sortStringCallback = (sort: Sort) => {
  return sort ? `${sort?.key}-${sort?.direction}` : undefined
}

export function formatDate(date: string | number | undefined) {
  if (!date) return null

  return new Date(date).toLocaleString('ru-RU')
}

export const onFileChange = async (
  e: ChangeEvent<HTMLInputElement>,
  setImgCallback: (img: string) => void
) => {
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
export const fromBase64 = (url: string) => {
  //todo: fix fileName
  if (url.length === 0) return
  const ext = url.split(';')[0].split('/')[1]

  return fetch(url)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], `fileName.${ext}`, { type: `image/${ext}` })
    })
    .catch(e => {
      console.error(e)
    })
}
