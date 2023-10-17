import { OrderByType } from '@/common/types.ts'

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
  author: {
    id: string
    name: string
  }
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
  orderBy?: OrderByType
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

type CardType = {
  answer: string
  answerImg: string | null
  answerVideo: string | null
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string | null
  questionVideo: string | null
  shots: number
  updated: string
  userId: string
}

export type GetCardsInDeckResponse = {
  items: Array<CardType>
  pagination: PaginationType
}

export type CreateCardInDeckType = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type CreateCardInDeckResponseType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}
