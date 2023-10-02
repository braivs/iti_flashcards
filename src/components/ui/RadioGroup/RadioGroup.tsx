import * as RRadioGroup from '@radix-ui/react-radio-group'

import s from './RadioGroup.module.scss'

export const RadioGroup = (props: PropsType) => {
  const Element = (props: RadioElementType) => {
    return (
      <div className={s.element}>
        <RRadioGroup.Item className={s.RadioGroupItem} value={props.value} id={props.id}>
          <RRadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RRadioGroup.Item>
        <label className={s.Label} htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    )
  }

  return (
    <div className={s.radio}>
      <RRadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue={props.value}
        aria-label="View density"
        value={props.value}
        onValueChange={e => {
          props.onValueChange(e)
        }}
        disabled={props.isDisabled ? props.isDisabled : false}
      >
        {props.options.map(e => (
          <Element key={e.id} id={e.id} value={e.value} label={e.label} />
        ))}
      </RRadioGroup.Root>
    </div>
  )
}

export type RadioElementType = {
  id: string
  value: string
  label: string
}

type PropsType = {
  value: string
  onValueChange: (e: string) => void
  options: Array<RadioElementType>
  isDisabled?: boolean
}
