import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/Checkbox/checkbox.tsx'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <Checkbox
      {...{
        onValueChange: onChange,
        checked: value,
        id: name,
        ...checkboxProps,
      }}
    />
  )
}
