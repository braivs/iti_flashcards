import { ComponentProps, FC, useEffect, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { Logout } from '@/assets/icons/Logout.tsx'
import { Person } from '@/assets/icons/Person.tsx'
import defaultAva from '@/assets/images/defaultAva.png'
import { Avatar } from '@/components/ui/Avatar/Avatar.tsx'
import { Button } from '@/components/ui/Button'
import { Vector } from '@/components/ui/Button/vector.tsx'
import { DropDownMenu } from '@/components/ui/DropDownMenu/DropDownMenu.tsx'
import { DropdownItemWithAvatar } from '@/components/ui/DropDownMenu/DropdownMenuWithAvatar/DropdownMenuWithAvatar'
import { DropdownItemWithIcon } from '@/components/ui/DropDownMenu/DropdownMenuWithIcon'
import Logo from '@/components/ui/Header/logo.tsx'
import { Typography } from '@/components/ui/Typography'
import { useGetMeQuery, useLogoutMutation } from '@/services/auth/auth.service.ts'

export type HeaderProps = ComponentProps<'header'>

export const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const { data: me } = useGetMeQuery()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (me && me?.success === false) setIsLoggedIn(false)
    else setIsLoggedIn(true)
  }, [me])

  const classNames = {
    header: clsx(s.header, className),
  }

  const [logout] = useLogoutMutation()

  const onClickHandler = (e: any) => {
    e.preventDefault()
    navigate('/personal-information')
  }

  return (
    <header className={classNames.header} {...rest}>
      <div className={s.wrapper}>
        <Logo />
        {isLoggedIn ? (
          <div className={s.containerNameAva}>
            <div className={s.name}>{me && me.name}</div>
            <DropDownMenu
              trigger={<Avatar urlAdress={me.avatar ? me.avatar : defaultAva} />}
              align={'end'}
            >
              <DropdownItemWithAvatar
                trigger={<Avatar urlAdress={me.avatar ? me.avatar : defaultAva} />}
              >
                <Typography variant={'Subtitle_2'} className={s.userName}>
                  {me && me.name}
                </Typography>
                <Typography variant={'Caption'} className={s.userEmail}>
                  {me && me.email}
                </Typography>
              </DropdownItemWithAvatar>
              <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
              <DropdownItemWithIcon
                icon={<Person color={'var(--color-light-100)'} className={s.icons} />}
                className={s.dropDownMenuItem}
                title={'My Profile'}
                onClick={onClickHandler}
                onSelect={() => {}}
              />
              <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
              <DropdownItemWithIcon
                icon={<Logout color={'var(--color-light-100)'} className={s.icons} />}
                title={'Sign Out'}
                onClick={() => logout()}
              />
            </DropDownMenu>
          </div>
        ) : (
          <Button className={s.button} variant="primary">
            <Vector />
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
