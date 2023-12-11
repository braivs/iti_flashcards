export type Direction = 'asc' | 'desc'
export type DecksSort = 'name' | 'cardsCount' | 'updated' | 'created'
export type CardsSort = 'answer' | 'question' | 'updated' | 'grade'
export type DecksOrderBy = `${DecksSort}-${Direction}`
export type CardsOrderBy = `${CardsSort}-${Direction}`
export type SelectedDeck = {
  id: string
  name: string
  isPrivate?: boolean
}
export type SelectedCard = {
  id: string
  question: string
}

export type SelectedCardUpdate = {
  id: string
  question: string
  answer: string
}
