import { Sort } from '@/services/common/types.ts'

export const sortStringCallback = (sort: Sort) => {
  return sort ? `${sort?.key}-${sort?.direction}` : undefined
}

export function formatDate(date: string | number | undefined) {
  if (!date) return null

  return new Date(date).toLocaleString('ru-RU')
}
