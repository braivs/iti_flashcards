import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import {Textfield, TextfieldPropsType} from "@/components/ui/Textfield"


export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<TextfieldPropsType, 'onChange' | 'value' | 'id'>

export const ControlledTextField = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })
  return <Textfield {...props} {...field} errorMessage={error?.message} id={props.name} />
}
