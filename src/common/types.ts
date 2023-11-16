export type Direction = 'asc' | 'desc'
export type DecksSortType = 'name' | 'cardsCount' | 'updated' | 'created'
export type CardsSortType = 'answer' | 'question' | 'updated' | 'grade'
export type OrderByType = `${DecksSortType}-${Direction}`
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
