import {ComponentProps, FC, useEffect, useState} from 'react'
import {clsx} from 'clsx'
import s from './header.module.scss'
import defaultAva from '@/assets/images/defaultAva.png'

import {Button} from '@/components/ui/Button'
import {Vector} from '@/components/ui/Button/vector.tsx'
import Logo from '@/components/ui/Header/logo.tsx'
import {useGetMeQuery, useLogoutMutation} from "@/services/auth/auth.service.ts"
import {DropdownItemWithAvatar} from "@/components/ui/DropDownMenu/DropdownMenuWithAvatar/DropdownMenuWithAvatar"
import {Avatar} from "@/components/ui/Avatar/Avatar.tsx"
import {Typography} from "@/components/ui/Typography"
import {DropDownMenu} from "@/components/ui/DropDownMenu/DropDownMenu.tsx"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {DropdownItemWithIcon} from "@/components/ui/DropDownMenu/DropdownMenuWithIcon"
import {Logout} from "@/assets/icons/Logout.tsx"
import {Person} from "@/assets/icons/Person.tsx"

export type HeaderProps = ComponentProps<'header'>

export const Header: FC<HeaderProps> = ({className, ...rest}) => {
  const {data: me} = useGetMeQuery()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (me && me?.success === false) setIsLoggedIn(false)
    else setIsLoggedIn(true)
  }, [me])

  const classNames = {
    header: clsx(s.header, className),
  }

  const [logout] = useLogoutMutation()

  return (
    <>
      <header className={classNames.header} {...rest}>
        <div className={s.wrapper}>
          <Logo/>
          {isLoggedIn ? (
            <div className={s.containerNameAva}>
              <div className={s.name}>{me && me.name}</div>
              <DropDownMenu trigger={<Avatar urlAdress={defaultAva}/>}>
                <DropdownItemWithAvatar trigger={<Avatar urlAdress={defaultAva}/>}>
                  <Typography variant={'Subtitle_2'} className={s.userName}>
                    {me && me.name}
                  </Typography>
                  <Typography variant={'Caption'} className={s.userEmail}>
                    {me && me.email}
                  </Typography>
                </DropdownItemWithAvatar>
                <DropdownMenu.Separator />
                <DropdownItemWithIcon
                  icon={<Person color={'var(--color-light-100)'} className={s.icons} />}
                  className={s.dropDownMenuItem}
                  title={'My Profile'}
                />
                <DropdownMenu.Separator />
                <DropdownItemWithIcon
                  icon={<Logout color={'var(--color-light-100)'} className={s.icons} />}
                  title={'Sign Out'}
                  onClick={() => logout()}
                />
              </DropDownMenu>
            </div>
          ) : (
            <Button className={s.button} variant="primary">
              <Vector/>
              Sign In
            </Button>
          )}
        </div>
      </header>
    </>
  )
}
