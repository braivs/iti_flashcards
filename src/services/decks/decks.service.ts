import { omit } from 'remeda'

import { baseApi } from '@/services/base-api.ts'
import {
  createCardIn_UpdateDeckArgs,
  CreateCardInDeckResponse,
  Deck,
  DeckArgs,
  DeckByIdResponse,
  DeckLearnArg,
  DecksResponse,
  GetCardsInDeckArgs,
  GetCardsInDeckResponse,
} from '@/services/decks/deck.types.ts'
import { RootState } from '@/services/store.ts'
import { Card } from '@/services/cards/cards.types.ts'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DeckArgs | void>({
      query: params => ({
        url: 'v1/decks',
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: ['Decks'],
    }),
    getDeckById: builder.query<DeckByIdResponse, { id: string }>({
      query: data => ({
        url: `v1/decks/${data.id}`,
        method: 'GET',
      }),
      providesTags: ['Deck'],
    }),
    getCardsInDeck: builder.query<GetCardsInDeckResponse, GetCardsInDeckArgs>({
      query: ({ id, ...params }) => ({
        url: `v1/decks/${id}/cards`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: ['CardsInDeck'],
    }),
    createDeck: builder.mutation<Deck, { formData: FormData }>({
      query: ({ formData }) => ({
        url: `v1/decks`,
        method: 'POST',
        body: formData,
      }),
      //pessimistic update
      onQueryStarted: async (_, { getState, queryFulfilled, dispatch }) => {
        const state = getState() as RootState
        const { itemsPerPage, searchByName, cardsCounts, currentPage, authorId, orderBy } =
          state.decks

        const result = await queryFulfilled

        try {
          dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                itemsPerPage: +itemsPerPage,
                name: searchByName,
                minCardsCount: cardsCounts[0],
                maxCardsCount: cardsCounts[1],
                currentPage,
                authorId,
                orderBy,
              },
              draft => {
                draft?.items?.unshift(result.data)
              }
            )
          )
        } catch (e) {
          console.error(e)
        }
      },
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      query: data => ({
        url: `v1/decks/${data.id}`,
        method: 'DELETE',
      }),

      //optimistic update
      onQueryStarted: async ({ id }, { getState, queryFulfilled, dispatch }) => {
        const state = getState() as RootState
        const { itemsPerPage, searchByName, cardsCounts, currentPage, authorId, orderBy } =
          state.decks
        const patchResult = dispatch(
          decksService.util.updateQueryData(
            'getDecks',
            {
              itemsPerPage: +itemsPerPage,
              name: searchByName,
              minCardsCount: cardsCounts[0],
              maxCardsCount: cardsCounts[1],
              currentPage,
              authorId,
              orderBy,
            },
            draft => {
              draft?.items?.splice(draft?.items?.findIndex(deck => deck.id === id), 1)
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Decks', 'Deck'],
    }),
    updateDeck: builder.mutation<DeckByIdResponse, createCardIn_UpdateDeckArgs>({
      query: ({ deckId, formData }) => {
        return {
          method: 'PATCH',
          url: `v1/decks/${deckId}`,
          body: formData,
        }
      },
      invalidatesTags: ['Decks', 'Deck'],
    }),
    createCardInDeck: builder.mutation<CreateCardInDeckResponse, createCardIn_UpdateDeckArgs>({
      query: ({ deckId, formData }) => ({
        url: `v1/decks/${deckId}/cards`,
        method: 'POST',
        body: formData ?? {},
      }),

      onQueryStarted: async (_, { getState, queryFulfilled, dispatch }) => {
        const result = await queryFulfilled
        const state = getState() as RootState
        const { itemsPerPage, id, currentPage, orderBy } = state.cards

        try {
          dispatch(
            decksService.util.updateQueryData(
              'getCardsInDeck',
              { itemsPerPage: +itemsPerPage, id, currentPage, orderBy },
              draft => {
                draft?.items?.unshift(resultConvert(result.data))
              }
            )
          )
        } catch (e) {
          console.error(e)
        }
      },
      invalidatesTags: ['CardsInDeck'], // not works together with onQueryStarted
      //todo: understand why it not works together
    }),
    getCard: builder.query<Card, { deckId: string }>({
      query: params => ({
        url: `v1/decks/${params.deckId}/learn`,
        method: 'GET',
      }),
      providesTags: ['Card'],
    }),
    postCard: builder.mutation<Card, DeckLearnArg>({
      query: body => ({
        url: `v1/decks/${body.cardId}/learn`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetDecksQuery,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetCardsInDeckQuery,
  useCreateCardInDeckMutation,
  useGetCardQuery,
  usePostCardMutation,
  useUpdateDeckMutation,
  useCreateDeckMutation,
} = decksService

const resultConvert = (card: CreateCardInDeckResponse): Card => {
  return omit({ ...card, grade: 0 }, ['type', 'moreId', 'comments', 'rating'])
}

//todo: maybe separate to function onQueryStarted
