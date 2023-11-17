import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardsOrderByType } from '@/common/types.ts'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    itemsPerPage: '9',
    id: '',
    currentPage: 1,
    orderBy: undefined as undefined | CardsOrderByType,
  },
  reducers: {
    setCardId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    updateCardsCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setCardsItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setCardsOrderBy: (state, action: PayloadAction<CardsOrderByType | undefined>) => {
      state.orderBy = action.payload
    },
  },
})

export const { setCardId, updateCardsCurrentPage, setCardsItemsPerPage, setCardsOrderBy } =
  cardsSlice.actions
