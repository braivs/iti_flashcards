import { DecksOrderBy } from '@/common/types.ts'
import { Card } from '@/services/cards/cards.types.ts'

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
  cover: string
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponse = {
  maxCardsCount: number
  items: Deck[]
  pagination: Pagination
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

export type DeckArgs = {
  name?: string
  authorId?: string
  orderBy?: DecksOrderBy
  minCardsCount?: number
  maxCardsCount?: number
  currentPage?: number
  itemsPerPage?: number
}

export type GetCardsInDeckArgs = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type GetCardsInDeckResponse = {
  items: Array<Card>
  pagination: Pagination
}

export type CreateCardInDeckResponse = Omit<Card, 'grade'> & {
  comments: string | null
  moreId: string | null
  rating: number
  type: string | null
}
export type createCardIn_UpdateDeckArgs = {
  deckId: string
  formData?: FormData
}

export type DeckLearnArg = {
  cardId: string
  grade: number
}
