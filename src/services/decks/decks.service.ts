import { omit } from 'remeda'

import { baseApi } from '@/services/base-api.ts'
import {
  CardType,
  CreateCardInDeckResponseType,
  DeckType,
  DeckByIdResponse,
  DeckLearnArgType,
  DeckParams,
  DecksResponse,
  GetCardsInDeckParams,
  GetCardsInDeckResponse,
  UpdateDeckType,
} from '@/services/decks/deck.types.ts'
import { RootState } from '@/services/store.ts'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DeckParams | void>({
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
    }),
    getCardsInDeck: builder.query<GetCardsInDeckResponse, GetCardsInDeckParams>({
      query: ({ id, ...params }) => ({
        url: `v1/decks/${id}/cards`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: ['CardsIdDeck'],
    }),
    createDeck: builder.mutation<DeckType, { name: string; isPrivate: boolean }>({
      query: data => ({
        url: `v1/decks`,
        method: 'POST',
        body: data,
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
      invalidatesTags: ['Decks'], //todo: maybe del invalidate and same in other places
    }),
    deleteDeck: builder.mutation<DeckType, { id: string }>({
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
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<DeckByIdResponse, { deckId: string; data: UpdateDeckType }>({
      query: ({ deckId, data }) => {
        return {
          method: 'PATCH',
          url: `v1/decks/${deckId}`,
          body: data,
        }
      },
      invalidatesTags: ['Decks'],
    }),
    createCardInDeck: builder.mutation<
      CreateCardInDeckResponseType,
      { deckId: string; formData?: FormData }
    >({
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
      // invalidatesTags: ['CardsIdDeck'], // not works together with onQueryStarted
      //todo: understand why it not works together
    }),
    getCard: builder.query<CardType, { deckId: string }>({
      query: params => ({
        url: `v1/decks/${params.deckId}/learn`,
        method: 'GET',
      }),
      providesTags: ['Card'],
    }),
    postCard: builder.mutation<CardType, DeckLearnArgType>({
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
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetCardsInDeckQuery,
  useCreateCardInDeckMutation,
  useGetCardQuery,
  usePostCardMutation,
  useUpdateDeckMutation,
} = decksService

const resultConvert = (card: CreateCardInDeckResponseType): CardType => {
  return omit({ ...card, grade: 0 }, ['type', 'moreId', 'comments', 'rating'])
}

//todo: maybe separate to function onQueryStarted
