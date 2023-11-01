import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  tagTypes: ['Me', 'Decks', 'CardsIdDeck', 'Card'],
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
