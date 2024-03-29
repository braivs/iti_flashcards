import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DecksOrderBy } from '@/common/types.ts'
import { maxCardsCountHard } from '@/pages/decks-page/maxCardsCount.tsx'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    itemsPerPage: '5',
    searchByName: '',
    cardsCounts: [0, maxCardsCountHard],
    currentPage: 1,
    authorId: '',
    orderBy: undefined as undefined | DecksOrderBy,
  },
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    updateDecksCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setDecksItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setCardsCounts: (state, action: PayloadAction<number[]>) => {
      state.cardsCounts = action.payload
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setDecksOrderBy: (state, action: PayloadAction<DecksOrderBy | undefined>) => {
      state.orderBy = action.payload
    },
  },
})

export const {
  updateDecksCurrentPage,
  setDecksItemsPerPage,
  setSearchByName,
  setCardsCounts,
  setAuthorId,
  setDecksOrderBy,
} = decksSlice.actions
