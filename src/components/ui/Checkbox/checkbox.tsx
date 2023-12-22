import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import Check from '@/components/ui/Checkbox/check.tsx'
import s from '@/components/ui/Checkbox/checkbox.module.scss'
import { Typography } from '@/components/ui/Typography/Typography.tsx'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onValueChange,
  position,
  disabled,
  required,
  label,
  id,
  className,
}) => {
  const classNames = {
    container: clsx(s.container, className),
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    indicator: clsx(s.indicator, checked && s.checked, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography variant="Body_2" className={classNames.label} as={'label'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              className={classNames.root}
              checked={checked}
              onCheckedChange={onValueChange}
              disabled={disabled}
              required={required}
              id={id}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <Check />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          <div className={s.label}>{label}</div>
        </Typography>
      </LabelRadix.Root>
    </div>
  )
}
