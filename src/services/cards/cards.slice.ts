import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    id: '',
  },
  reducers: {
    setCardId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
  },
})

export const { setCardId } = cardsSlice.actions
