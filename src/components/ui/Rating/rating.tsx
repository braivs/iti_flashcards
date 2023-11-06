import { StarIcon } from '@/assets/icons/Star.tsx'
import { StarOutline } from '@/assets/icons/StarOutline.tsx'

export type GradeProps = {
  value: number
  //onClick: (value: number) => void
}
export const Grade = (props: GradeProps) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span key={index}>{index < props.value ? <StarIcon /> : <StarOutline />}</span>
      ))}
    </div>
  )
}
//onClick={() => props.onClick(index + 1)}
