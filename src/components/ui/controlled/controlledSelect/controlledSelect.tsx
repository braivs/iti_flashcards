import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { Select } from '@/components/ui/Select'
import { SelectPropsType } from '@/components/ui/Select/Select.tsx'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
} & Omit<SelectPropsType, 'onChange' | 'value' | 'id'>

export const ControlledSelect = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
  })

  return <Select {...props} {...field} id={props.name} />
}
