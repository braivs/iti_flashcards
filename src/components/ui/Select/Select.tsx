import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './Select.module.scss'

import sC from '@/components/ui/Textfield/Textfield.module.scss'
import { Typography } from '@/components/ui/Typography'

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const mappedOptions = props.options.map((e, i) => (
    <RSelect.Item key={'option-' + i} className={s.item} value={e}>
      {e}
    </RSelect.Item>
  ))

  return (
    <>
      {props.label && (
        <label className={sC.label}>
          <Typography variant={'Body_2'}>{props.label}</Typography>
        </label>
      )}
      <RSelect.Root
        value={props.value}
        onValueChange={e => {
          props.onChangeOption(e)
        }}
        disabled={props.isDisabled ? props.isDisabled : false}
      >
        <RSelect.Trigger className={clsx(s.trigger, props.isGreyColor ? s.triggerGrey : '')}>
          <RSelect.Value aria-label={props.value}>{props.value}</RSelect.Value>
          <RSelect.Icon>
            <ChevronDownIcon />
          </RSelect.Icon>
        </RSelect.Trigger>
        <RSelect.Portal>
          <RSelect.Content
            className={clsx(s.content, props.isGreyColor ? s.contentGrey : '')}
            position={'popper'}
            collisionPadding={0}
            sideOffset={-10}
          >
            <RSelect.ScrollUpButton />
            <RSelect.Viewport className={s.viewport}>{mappedOptions}</RSelect.Viewport>
            <RSelect.ScrollDownButton />
            <RSelect.Arrow />
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root>
    </>
  )
}

type DefaultSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export type SelectProps = DefaultSelectProps & {
  options: Array<string>
  value: string
  onChangeOption: (value: string) => void
  isDisabled?: boolean
  isGreyColor?: boolean
  label?: string
}
