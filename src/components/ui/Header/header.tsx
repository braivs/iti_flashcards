import { ComponentProps, FC } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

import s from './header.module.scss'

import { Logout } from '@/assets/icons/Logout.tsx'
import { Person } from '@/assets/icons/Person.tsx'
import defaultAva from '@/assets/images/defaultAva.png'
import logo from '@/assets/images/logoCan.jpg'
import { Avatar } from '@/components/ui/Avatar/Avatar.tsx'
import { Button } from '@/components/ui/Button'
import { Vector } from '@/components/ui/Button/vector.tsx'
import { DropDownMenu } from '@/components/ui/DropDownMenu/DropDownMenu.tsx'
import { DropdownItemWithAvatar } from '@/components/ui/DropDownMenu/DropdownMenuWithAvatar/DropdownMenuWithAvatar'
import { DropdownItemWithIcon } from '@/components/ui/DropDownMenu/DropdownMenuWithIcon'
import { Typography } from '@/components/ui/Typography'
import { useGetMeQuery, useLogoutMutation } from '@/services/auth/auth.service.ts'

export type HeaderProps = ComponentProps<'header'>

export const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const { data: me } = useGetMeQuery()
  const isLoggedIn = me && me.success !== false

  const classNames = {
    header: clsx(s.header, className),
    link: clsx(s.link),
  }

  const [logout] = useLogoutMutation()

  return (
    <header className={classNames.header} {...rest}>
      <div className={s.wrapper}>
        <Link to={'/'}>
          {/*<Logo />*/}
          <img src={logo} alt="logo" />
        </Link>

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
              <Link to={'/personal-information'} className={classNames.link}>
                <DropdownItemWithIcon
                  icon={<Person color={'var(--color-light-100)'} className={s.icons} />}
                  className={s.dropDownMenuItem}
                  title={'My Profile'}
                  // onClick={onClickHandler}
                  onClick={() => {}}
                  onSelect={() => {}}
                />
              </Link>

              <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
              {/*<Link to={'/login'}>*/}
              <DropdownItemWithIcon
                icon={<Logout color={'var(--color-light-100)'} className={s.icons} />}
                title={'Sign Out'}
                onClick={() => logout()}
              />
              {/*</Link>*/}
            </DropDownMenu>
          </div>
        ) : (
          <Link to={'/login'}>
            <Button className={s.button} variant="primary">
              <Vector />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
