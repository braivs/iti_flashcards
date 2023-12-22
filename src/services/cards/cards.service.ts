import { baseApi } from '@/services/base-api.ts'
import { decksService } from '@/services/decks/decks.service.ts'
import { RootState } from '@/services/store.ts'
import {Card, UpdateCard} from "@/services/cards/cards.types.ts"
const cardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteCard: builder.mutation<{}, { id: string }>({
      query: data => ({
        url: `/v1/cards/${data.id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ id }, { getState, queryFulfilled, dispatch }) => {
        const state = getState() as RootState
        const { id: deckId } = state.cards

        const patchResult = dispatch(
          decksService.util.updateQueryData('getCardsInDeck', { id: deckId }, draft => {
            draft?.items?.splice(draft?.items?.findIndex(card => card?.id === id), 1)
          })
        )
        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      invalidatesTags: ['CardsInDeck'],
    }),
    updateCard: builder.mutation<Card, { id: string; data: UpdateCard }>({
      query: ({ id, data }) => ({
        url: `/v1/cards/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['CardsInDeck'],
    }),
  }),
})

export const { useDeleteCardMutation, useUpdateCardMutation } = cardsService
