import { useState } from 'react'

import { clsx } from 'clsx'

import { Card } from '../ui/Card'
import { Typography } from '../ui/Typography'

import s from './personal-information.module.scss'

import { Edit } from '@/assets/icons/Edit.tsx'
import { Logout } from '@/assets/icons/Logout.tsx'
import { Button } from '@/components/ui/Button'
import { Textfield } from '@/components/ui/Textfield'

type PersonalInformationType = {
  userName?: string
  email?: string
  avatar?: string
  onChangeUserName?: (userName: string) => void
  onLogout?: () => void
  onChangeAvatar?: (newAvatar: string) => void
}
export const PersonalInformation = ({
  userName = 'Ivan',
  email = 'google-shmoogle.gsh.com',
  avatar = 'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=826&t=st=1693944282~exp=1693944882~hmac=db975532c35e66aee49662f13349eb1ca1eab57963a6931222633c594a4f5a90',
  onChangeUserName,
  onChangeAvatar,
  onLogout,
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
  const onChangeEditMode = () => {
    onChangeAvatar && onChangeAvatar('newAvatar')
    onChangeUserName && onChangeUserName('New Name')

    setEditMode(!editMode)
  }

  // const changeAvatarHandler = () => {
  //   onChangeAvatar && onChangeAvatar('newAvatar')
  // }
  //
  // const changeUserNameHandler = () => {
  //   onChangeUserName && onChangeUserName('New Name')
  // }

  const logoutHandler = () => {
    onLogout && onLogout()
  }

  return (
    <Card className={classNames.container}>
      <Typography variant={'Large'} className={classNames.title}>
        Personal Information
      </Typography>
      <div className={classNames.imageContainer}>
        <img src={avatar} alt="personalImg" className={classNames.image} />
        {!editMode && (
          <Button
            variant={'secondary'}
            className={classNames.imageButton}
            onClick={onChangeEditMode}
          >
            <Edit color={'var(--color-light-100)'} className={classNames.iconButton} />
          </Button>
        )}
      </div>
      {editMode ? (
        <div className={classNames.editModeContainer}>
          <Textfield label={'Nickname'} type={'text'} placeholder={userName} onChange={() => {}} />
          <Button
            variant={'primary'}
            fullWidth={true}
            onClick={onChangeEditMode}
            className={classNames.editModeButton}
          >
            Save Changes
          </Button>
        </div>
      ) : (
        <>
          <div className={classNames.subtitleContainer}>
            <Typography variant={'H1'} className={classNames.userName}>
              {userName}
            </Typography>
            <Button variant={'link'} onClick={onChangeEditMode}>
              <Edit color={'var(--color-light-100)'} className={classNames.iconButton} />
            </Button>
          </div>
          <div>
            <Typography variant={'Body_2'} className={classNames.userEmail}>
              {email}
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
