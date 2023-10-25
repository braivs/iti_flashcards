import { baseApi } from '@/services/base-api.ts'
import {
  CreateCardInDeckResponseType,
  CreateCardInDeckType,
  Deck,
  DeckByIdResponse,
  DeckParams,
  DecksResponse,
  GetCardsInDeckParams,
  GetCardsInDeckResponse,
} from '@/services/decks/deck.types.ts'
import { RootState } from '@/services/store.ts'

const decksService = baseApi.injectEndpoints({
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
      query: params => ({
        url: `v1/decks/${params.id}/cards`,
        method: 'GET', // todo: add params
      }),
      providesTags: ['CardsIdDeck'],
    }),
    createDeck: builder.mutation<Deck, { name: string; isPrivate: boolean }>({
      query: data => ({
        url: `v1/decks`,
        method: 'POST',
        body: data,
      }),
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
    createCardInDeck: builder.mutation<
      CreateCardInDeckResponseType,
      { deckId: string; data: CreateCardInDeckType }
    >({
      query: ({ deckId, data }) => ({
        url: `v1/decks/${deckId}/cards`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CardsIdDeck'],
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
} = decksService
