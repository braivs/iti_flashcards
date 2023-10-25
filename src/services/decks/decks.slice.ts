import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { OrderByType } from '@/common/types.ts'
import { maxCardsCountHard } from '@/pages/decks-page/maxCardsCount.tsx'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    itemsPerPage: '9',
    searchByName: '',
    cardsCounts: [0, maxCardsCountHard],
    currentPage: 1,
    authorId: '',
    orderBy: undefined as undefined | OrderByType,
  },
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setCardsCounts: (state, action: PayloadAction<number[]>) => {
      state.cardsCounts = action.payload
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setOrderBy: (state, action: PayloadAction<OrderByType | undefined>) => {
      state.orderBy = action.payload
    },
  },
})

export const {
  updateCurrentPage,
  setItemsPerPage,
  setSearchByName,
  setCardsCounts,
  setAuthorId,
  setOrderBy,
} = decksSlice.actions
