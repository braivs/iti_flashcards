import { baseApi } from '@/services/base-api.ts'
const cardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteCard: builder.mutation<{}, { id: string }>({
      query: data => ({
        url: `/v1/cards/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CardsIdDeck'],
    }),
  }),
})

export const { useDeleteCardMutation } = cardsService
