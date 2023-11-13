export type Direction = 'asc' | 'desc'
export type FieldType = 'name' | 'cardsCount' | 'updated' | 'created'
export type OrderByType = `${FieldType}-${Direction}`
export type SelectedDeckType = {
  id: string
  name: string
  isPrivate?: boolean
}
export type SelectedCardType = {
  id: string
  question: string
}

export type SelectedCardUpdateType = {
  id: string
  question: string
  answer: string
}
