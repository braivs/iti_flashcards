import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import arrowLeft from '@/assets/icons/ArrowLeft.svg'
import { Edit } from '@/assets/icons/Edit.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import sC from '@/common/commonStyles/common.module.scss'
import sT from '@/common/commonStyles/tables.module.scss'
import { sortStringCallback } from '@/common/services.ts'
import { CardsOrderByType, SelectedCardType, SelectedCardUpdateType } from '@/common/types.ts'
import { paginationSelectValues } from '@/common/values.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddNewCard } from '@/components/ui/Dialogs/DialogAddNewCard/DialogAddNewCard.tsx'
import { DialogRemoveCard } from '@/components/ui/Dialogs/DialogRemoveCard.tsx'
import { DialogUpdateCard } from '@/components/ui/Dialogs/DialogUpdateCard.tsx'
import { Pagination } from '@/components/ui/Pagination'
import { Grade } from '@/components/ui/Rating/rating.tsx'
import { Column, Table } from '@/components/ui/Table'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import {
  setCardId,
  setCardsItemsPerPage,
  setCardsOrderBy,
  updateCardsCurrentPage,
} from '@/services/cards/cards.slice.ts'
import { Sort } from '@/services/common/types.ts'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/services/decks/decks.service.ts'

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
  const [selectedForUpdateCard, setSelectedForUpdateCard] = useState<SelectedCardUpdateType>({
    id: '',
    question: '',
    answer: '',
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // for delete dialog
  const [selectedCard, setSelectedCard] = useState<SelectedCardType>({
    id: '',
    question: '',
  })
  const [sort, setSort] = useState<Sort>(null) // for sorting cells in table
  const [isEditBlocked, setIsEditBlocked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (deckId) {
      dispatch(setCardId(deckId))
    }
  }, [deckId]) // for optimistic and pessimistic updates

  useEffect(() => {
    const sortString: string | undefined = sortStringCallback(sort)

    dispatch(setCardsOrderBy(sortString as CardsOrderByType))
  }, [sort]) //todo: maybe refactor, to avoid useEffect 'finish refactor'

  useEffect(() => {
    setIsEditBlocked(data?.userId !== me.id)
  }, [data?.userId, me.id])

  const columns: Column[] = [
    {
      key: 'question',
      title: 'Question',
      sortable: true,
    },
    {
      key: 'answer',
      title: 'Answer',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'grade',
      title: 'Grade',
      sortable: true,
    },
    {
      key: 'options',
      title: '',
    },
  ]

  const onOpenDialog = () => {
    setIsAddNewCardDialogOpen(true)
  }

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

  // for elements blocking if alien deck
  const cursorByEdit = () => (!isEditBlocked ? '' : sT.cursorAuto)
  const colorByEdit = (): 'white' | 'grey' => (!isEditBlocked ? 'white' : 'grey')

  return (
    <div className={sT.component}>
      <DialogRemoveCard
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <DialogUpdateCard
        open={isUpdateDialogOpen}
        setOpen={setIsUpdateDialogOpen}
        selectedCard={selectedForUpdateCard}
        setSelectedCard={setSelectedForUpdateCard}
        id={selectedForUpdateCard.id ?? ''}
        answer={selectedForUpdateCard.answer}
        question={selectedForUpdateCard.question}
      />
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
          <Button disabled={isEditBlocked} onClick={() => setIsAddNewCardDialogOpen(true)}>
            Add New Card
          </Button>
        )}
      </div>
      {cards && cards.items.length === 0 ? (
        <div className={s.emptyPackContainer}>
          <Typography variant={'Subtitle_2'} className={s.Subtitle_2}>
            This pack is empty.
            {!isEditBlocked ? (
              <span> Click add new card to fill this pack</span>
            ) : (
              <span> You can&apos;t create cards in a deck that you don&apos;t own.</span>
            )}
          </Typography>
          <Button onClick={onOpenDialog} disabled={isEditBlocked}>
            Add New Card
          </Button>
        </div>
      ) : (
        <>
          <div className={sT.container}>
            <Table.Root className={sT.tableContainer}>
              <Table.Header columns={columns} onSort={setSort} sort={sort} />
              <Table.Body>
                {cards &&
                  cards.items.map(data => {
                    return (
                      <Table.Row key={data.id}>
                        <Table.Cell>{data.question}</Table.Cell>
                        <Table.Cell>{data.answer}</Table.Cell>
                        <Table.Cell>{data.updated}</Table.Cell>
                        <Table.Cell>
                          <Grade value={data.grade} />
                        </Table.Cell>
                        <Table.Cell>
                          <div className={sT.iconContainer}>
                            <Button
                              variant={'link'}
                              onClick={
                                !isEditBlocked
                                  ? () => onSelectCardForUpdate(data.id, data.question, data.answer)
                                  : () => {}
                              }
                              className={cursorByEdit()}
                            >
                              <Edit color={colorByEdit()} />
                            </Button>
                            <Button
                              variant={'link'}
                              onClick={
                                !isEditBlocked
                                  ? () => onSelectCardForDel(data.id, data.question)
                                  : () => {}
                              }
                              className={cursorByEdit()}
                            >
                              <TrashHollow color={colorByEdit()} />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table.Root>
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
