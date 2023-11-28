import { DecksOrderByType } from '@/common/types.ts'

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

type PaginationType = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponse = {
  maxCardsCount: number
  items: Deck[]
  pagination: PaginationType
}

export type DeckByIdResponse = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type DeckParams = {
  name?: string
  authorId?: string
  orderBy?: DecksOrderByType
  minCardsCount?: number
  maxCardsCount?: number
  currentPage?: number
  itemsPerPage?: number
}

export type GetCardsInDeckParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateCardInDeckType = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateDeckType = {
  cover: string
  name: string
  isPrivate?: boolean
}
export type CardType = {
  id: string
  deckId: string
  userId: string
  answer: string
  answerImg: string | null
  answerVideo: string | null
  created: string
  grade: number
  question: string
  questionImg: string | null
  questionVideo: string | null
  shots: number
  updated: string
}

export type GetCardsInDeckResponse = {
  items: Array<CardType>
  pagination: PaginationType
}

export type CreateCardInDeckResponseType = Omit<CardType, 'grade'> & {
  comments: string | null
  moreId: string | null
  rating: number
  type: string | null
}

export type UpdateCardType = {
  questionImg?: string | null
  answerImg?: string | null
  question: string
  answer: string
  questionVideo?: string | null
  answerVideo?: string | null
}

export type LearnCardType = Omit<CardType, 'grade'> & {
  rating: number
}

export type DeckLearnArgType = {
  cardId: string
  grade: number
}

// const orderBy: DeckParams['orderBy'] = 'updated-desc'
