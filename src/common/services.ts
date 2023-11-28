import { Sort } from '@/services/common/types.ts'

export const sortStringCallback = (sort: Sort) => {
  return sort ? `${sort?.key}-${sort?.direction}` : undefined
}
