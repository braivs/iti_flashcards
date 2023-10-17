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
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        // pessimistic update (not works)
        const state = getState() as RootState

        try {
          const response = await queryFulfilled

          dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              { authorId: '1', currentPage: state.decks.currentPage },
              draft => {
                draft.items.unshift(response.data)
              }
            )
          )
        } catch (error) {
          console.log(error)
        }

        /**
         * Alternatively, on failure you can invalidate the corresponding cache tags
         * to trigger a re-fetch:
         * dispatch(api.util.invalidateTags(['Post']))
         */
      },
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      query: data => ({
        url: `v1/decks/${data.id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        // optimistic update (not works)

        const state = getState() as RootState

        const patchResult = dispatch(
          decksService.util.updateQueryData(
            'getDecks',
            { authorId: '1', currentPage: state.decks.currentPage },
            draft => {
              draft.items = draft.items.filter(item => item.id !== id)
            }
          )
        )

        try {
          await queryFulfilled
        } catch (error) {
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
