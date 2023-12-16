import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import defaultAva from '../../assets/images/defaultAva.png'
import { Card } from '../ui/Card'
import { ControlledTextField } from '../ui/controlled/controlled-text-field'
import { Typography } from '../ui/Typography'

import s from './personal-information.module.scss'

import { Edit } from '@/assets/icons/Edit.tsx'
import { Logout } from '@/assets/icons/Logout.tsx'
import { AvatarRadix } from '@/components/ui/AvatarRadix/AvatarRadix.tsx'
import { Button } from '@/components/ui/Button'

type PersonalInformationType = {
  userName?: string
  userEmail?: string
  avatar?: string | null
  onLogout?: () => void
  onChangePersonalData?: (newName: FormData) => void
  onChangeAvatar?: (data: FormData) => void
}

const schema = z.object({
  name: z.string().min(1),
})

type FormValues = z.input<typeof schema>

export const PersonalInformation = ({
  userName = 'Ivan',
  userEmail = 'google-shmoogle.gsh.com',
  avatar = 'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=826&t=st=1693944282~exp=1693944882~hmac=db975532c35e66aee49662f13349eb1ca1eab57963a6931222633c594a4f5a90',
  onChangePersonalData,
  onLogout,
  onChangeAvatar,
}: PersonalInformationType) => {
  const classNames = {
    imageContainer: clsx(s.imageContainer),
    image: clsx(s.userPhoto),
    container: clsx(s.container),
    title: clsx(s.title),
    imageButton: clsx(s.imageButton),
    iconButton: clsx(s.icon),
    subtitleContainer: clsx(s.subtitleContainer),
    userName: clsx(s.userName),
    userEmail: clsx(s.userEmail),
    logButton: clsx(s.logButton),
    editModeContainer: clsx(s.editModeContainer),
    editModeButton: clsx(s.editModeButton),
  }

  const [editMode, setEditMode] = useState(false)

  const finalUrlAvatar = avatar ? avatar : defaultAva

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userName,
    },
  })

  const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      formData.append('avatar', file)
    }

    onChangeAvatar && onChangeAvatar(formData)
  }

  const handleFormSubmitted = handleSubmit(data => {
    const formData = new FormData()

    if (!isDirty) {
      setEditMode(!editMode)
    } else {
      if (data.name) {
        formData.append('name', data.name)
      }
      onChangePersonalData && onChangePersonalData(formData)
      setEditMode(!editMode)
    }

    //setFileCount(0)
  })
  const logoutHandler = () => {
    onLogout && onLogout()
  }

  return (
    <Card className={classNames.container}>
      <Typography variant={'Large'} className={classNames.title}>
        Personal Information
      </Typography>
      <div className={classNames.imageContainer}>
        <AvatarRadix urlAdress={finalUrlAvatar} userName={userName} />
        {!editMode && (
          <div className={classNames.imageButton}>
            <input
              name={'avatar'}
              type={'file'}
              accept={'image/*'}
              onChange={onChangeAvatarHandler}
              id={'input_file'}
              className={s.inputFile}
            />
            <label htmlFor="input_file">
              <Button
                as={'span'}
                variant={'secondary'}
                fullWidth={true}
                className={classNames.imageButton}
              >
                <Edit color={'var(--color-light-100)'} className={classNames.iconButton} />
              </Button>
            </label>
          </div>
        )}
      </div>
      {editMode ? (
        <form onSubmit={handleFormSubmitted} className={classNames.editModeContainer}>
          <ControlledTextField name={'name'} control={control} label={'Nickname'} type={'text'} />
          <Button
            type="submit"
            variant={'primary'}
            fullWidth={true}
            className={classNames.editModeButton}
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <>
          <div className={classNames.subtitleContainer}>
            <Typography variant={'H1'} className={classNames.userName}>
              {userName}
            </Typography>
            <Button
              variant={'link'}
              onClick={() => setEditMode(true)}
              className={classNames.imageButton}
            >
              <Edit color={'var(--color-light-100)'} className={classNames.iconButton} />
            </Button>
          </div>
          <div>
            <Typography variant={'Body_2'} className={classNames.userEmail}>
              {userEmail}
            </Typography>
          </div>

          <Button variant={'secondary'} className={classNames.logButton} onClick={logoutHandler}>
            <Logout color={'var(--color-light-100)'} />
            Logout
          </Button>
        </>
      )}
    </Card>
  )
}
