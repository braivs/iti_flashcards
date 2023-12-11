import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import arrowLeft from '@/assets/icons/ArrowLeft.svg'
import sC from '@/common/commonStyles/common.module.scss'
import sT from '@/common/commonStyles/tables.module.scss'
import { CardsOrderBy, SelectedCard, SelectedCardUpdate } from '@/common/types.ts'
import { paginationSelectValues } from '@/common/values.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddNewCard } from '@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.tsx'
import { DialogRemoveCard } from '@/components/ui/Dialogs/DialogRemoveCard.tsx'
import { DialogUpdateCard } from '@/components/ui/Dialogs/DialogUpdateCard.tsx'
import { Pagination } from '@/components/ui/Pagination'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { sortStringCallback } from '@/common/functions.ts'
import {
  setCardId,
  setCardsItemsPerPage,
  setCardsOrderBy,
  updateCardsCurrentPage,
} from '@/services/cards/cards.slice.ts'
import { Sort } from '@/services/common/types.ts'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/services/decks/decks.service.ts'
import { CardsTable } from '@/pages/cards-page/CardsTable.tsx'

export const CardsPage = () => {
  const { currentPage, itemsPerPage, orderBy } = useAppSelector(state => state.cards)

  let { deckId } = useParams()
  const { data } = useGetDeckByIdQuery({ id: deckId ? deckId : '' })
  const { data: cards } = useGetCardsInDeckQuery({
    itemsPerPage: +itemsPerPage,
    id: deckId ? deckId : '',
    currentPage,
    orderBy,
  })
  const { data: me } = useGetMeQuery()

  const [isAddNewCardDialogOpen, setIsAddNewCardDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false) // for Update dialog
  const [selectedForUpdateCard, setSelectedForUpdateCard] = useState<SelectedCardUpdate>({
    id: '',
    question: '',
    answer: '',
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // for delete dialog
  const [selectedCard, setSelectedCard] = useState<SelectedCard>({
    id: '',
    question: '',
  })
  const [sort, setSort] = useState<Sort>(null) // for sorting cells in table
  const [isEditHidden, setIsEditHidden] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (deckId) {
      dispatch(setCardId(deckId))
    }
  }, [deckId]) // for optimistic and pessimistic updates

  useEffect(() => {
    const sortString: string | undefined = sortStringCallback(sort)

    dispatch(setCardsOrderBy(sortString as CardsOrderBy))
  }, [sort])

  useEffect(() => {
    setIsEditHidden(data?.userId !== me.id)
  }, [data?.userId, me.id])

  const onArrowLeft = () => {
    navigate(`/`)
  }

  const onSelectCardForDel = (id: string, question: string) => {
    setIsDeleteDialogOpen(true)
    setSelectedCard({ id, question })
  }
  const onSelectCardForUpdate = (id: string, question: string, answer: string) => {
    setIsUpdateDialogOpen(true)
    setSelectedForUpdateCard({ id, question, answer })
  }
  const updateCardsCurrentPageCallback = (page: number | string) => {
    dispatch(updateCardsCurrentPage(+page))
  }

  const setCardsItemsPerPageCallback = (value: string) => dispatch(setCardsItemsPerPage(value)) // for pagination

  const onAddCard = () => {
    setIsAddNewCardDialogOpen(true)
  }

  return (
    <div className={sT.component}>
      {isDeleteDialogOpen && (
        <DialogRemoveCard
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )}
      {isUpdateDialogOpen && selectedForUpdateCard && (
        <DialogUpdateCard
          open={isUpdateDialogOpen}
          setOpen={setIsUpdateDialogOpen}
          selectedCard={selectedForUpdateCard}
          setSelectedCard={setSelectedForUpdateCard}
          id={selectedForUpdateCard.id ?? ''}
          answer={selectedForUpdateCard.answer}
          question={selectedForUpdateCard.question}
        />
      )}

      <DialogAddNewCard
        open={isAddNewCardDialogOpen}
        setOpen={setIsAddNewCardDialogOpen}
        deckId={deckId ? deckId : ''}
      />
      <div className={s.arrowContainer} onClick={onArrowLeft}>
        <img src={arrowLeft} alt="arrowLeft" />
        <span className={s.text}>Back to Packs List</span>
      </div>
      <div className={sT.topContainer}>
        <Typography variant={'H1'}>{data?.name}</Typography>
        {data?.cardsCount !== 0 && (
          <Button disabled={isEditHidden} onClick={onAddCard}>
            Add New Card
          </Button>
        )}
      </div>
      {cards && cards.items.length === 0 ? (
        <div className={s.emptyPackContainer}>
          <Typography variant={'Subtitle_2'} className={s.Subtitle_2}>
            This pack is empty.
            {!isEditHidden ? (
              <span> Click add new card to fill this pack</span>
            ) : (
              <span> You can&apos;t create cards in a deck that you don&apos;t own.</span>
            )}
          </Typography>
          <Button onClick={onAddCard} disabled={isEditHidden}>
            Add New Card
          </Button>
        </div>
      ) : (
        <>
          <div className={sT.container}>
            <CardsTable
              sort={sort}
              setSort={setSort}
              items={cards?.items}
              isEditHidden={isEditHidden}
              onSelectCardForUpdate={onSelectCardForUpdate}
              onSelectCardForDel={onSelectCardForDel}
            />
          </div>

          <div className={sC.paginationContainer}>
            <Pagination
              onPageChange={updateCardsCurrentPageCallback}
              totalCount={cards?.pagination.totalItems ?? 0}
              currentPage={currentPage}
              pageSize={+itemsPerPage}
              siblingCount={2}
              selectSettings={{
                value: itemsPerPage,
                onChangeOption: setCardsItemsPerPageCallback,
                arr: paginationSelectValues,
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
