import * as Tabs from '@radix-ui/react-tabs'

import s from './TabSwitcher.module.scss'

import { Typography } from '@/components/ui/Typography'

export const TabSwitcher = (props: PropsType) => {
  return (
    <div className={s.container}>
      <div className={s.TypBox}>
        {props.label && (
          <Typography variant={'Body_2'} className={s.TabLabel} as={'label'}>
            {props.label}
          </Typography>
        )}
      </div>
      <Tabs.Root className={s.TabsRoot} defaultValue={props.defaultValue} value={props.value}>
        <Tabs.List className={s.TabsList} aria-label="Manage your account">
          {props.values.map(v => {
            return (
              <Tabs.Trigger
                key={v.index}
                className={s.TabsTrigger}
                value={v.value}
                onClick={() => props.onChangeCallback(v.value)}
                disabled={props.isDisabled}
              >
                {v.text}
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}

export type TabSwitcherValues = {
  index: number
  value: string
  text: string
}

type PropsType = {
  onChangeCallback: (index: string) => void
  values: Array<TabSwitcherValues>
  isDisabled?: boolean
  defaultValue?: string
  value?: string
  label?: string
}
