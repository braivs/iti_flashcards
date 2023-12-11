import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardsOrderBy } from '@/common/types.ts'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    itemsPerPage: '9',
    id: '',
    currentPage: 1,
    orderBy: undefined as undefined | CardsOrderBy,
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
    setCardsOrderBy: (state, action: PayloadAction<CardsOrderBy | undefined>) => {
      state.orderBy = action.payload
    },
  },
})

export const { setCardId, updateCardsCurrentPage, setCardsItemsPerPage, setCardsOrderBy } =
  cardsSlice.actions
