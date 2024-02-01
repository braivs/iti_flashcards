import { useEffect, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useNavigate, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import arrowLeft from '@/assets/icons/ArrowLeft.svg'
import { Edit } from '@/assets/icons/Edit'
import { Play } from '@/assets/icons/Play.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import sC from '@/common/commonStyles/common.module.scss'
import sT from '@/common/commonStyles/tables.module.scss'
import { sortStringCallback } from '@/common/functions.ts'
import { CardsOrderBy, SelectedCard, SelectedCardUpdate, SelectedDeck } from '@/common/types.ts'
import { paginationSelectValues } from '@/common/constants.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddCard } from '@/components/ui/Dialogs/DialogAddCard/DialogAddCard.tsx'
import { DialogRemoveCard } from '@/components/ui/Dialogs/DialogRemoveCard.tsx'
import { DialogRemovePack } from '@/components/ui/Dialogs/DialogRemovePack.tsx'
import { DialogUpdateCard } from '@/components/ui/Dialogs/DialogUpdateCard.tsx'
import { DialogUpdatePack } from '@/components/ui/Dialogs/DialogUpdatePack.tsx'
import { DropDownMenu } from '@/components/ui/DropDownMenu/DropDownMenu.tsx'
import { DropdownItemWithIcon } from '@/components/ui/DropDownMenu/DropdownMenuWithIcon'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { Pagination } from '@/components/ui/Pagination'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { CardsTable } from '@/pages/cards-page/CardsTable.tsx'
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
  const { data: cards, isLoading } = useGetCardsInDeckQuery({
    itemsPerPage: +itemsPerPage,
    id: deckId ? deckId : '',
    currentPage,
    orderBy,
  })
  const { data: me } = useGetMeQuery()

  // const data = currentData ?? decks
  // const data = decks

  const [selectedDeck, setSelectedDeck] = useState<SelectedDeck>({
    id: '',
    name: '',
    isPrivate: false,
  })

  const [isUpdateDeckDialogOpen, setIsUpdateDeckDialogOpen] = useState(false) // for update decks dialog
  const [isDeleteDeckDialogOpen, setIsDeleteDeckDialogOpen] = useState(false) // for delete decks dialog

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

  // DECKS
  const onPlayLearn = () => {
    navigate(`/learn/${deckId}`)
  }

  const onSelectDeckForDel = (id: string, name: string) => {
    setIsDeleteDeckDialogOpen(true)
    setSelectedDeck({ id, name })
  }
  const onSelectDeckForUpdate = (id: string, name: string, isPrivate: boolean, cover?: string) => {
    setIsUpdateDeckDialogOpen(true)
    setSelectedDeck({ id, name, isPrivate, cover: cover ?? '' })
  }

  const onEditDeckHandler = () => {
    onSelectDeckForUpdate(
      data?.id ?? '123',
      data?.name ?? 'Hello',
      data?.isPrivate ?? false,
      data?.cover
    )
  }

  const onDeleteDeckHandler = () => {
    onSelectDeckForDel(data?.id ?? '123', data?.name ?? 'Hello')
    // navigate(`/`)
  }

  const onSelectCardForDel = (id: string, question: string) => {
    setIsDeleteDialogOpen(true)
    setSelectedCard({ id, question })
  }
  const onSelectCardForUpdate = (
    id: string,
    question: string,
    answer: string,
    questionImg?: string,
    answerImg?: string,
    questionVideo?: string,
    answerVideo?: string
  ) => {
    setIsUpdateDialogOpen(true)
    setSelectedForUpdateCard({
      id,
      question,
      answer,
      questionImg: questionImg ? questionImg : '',
      answerImg: answerImg ? answerImg : '',
      questionVideo: questionVideo ? questionVideo : undefined,
      answerVideo: answerVideo ? answerVideo : undefined,
    })
  }
  const updateCardsCurrentPageCallback = (page: number | string) => {
    dispatch(updateCardsCurrentPage(+page))
  }

  const setCardsItemsPerPageCallback = (value: string) => dispatch(setCardsItemsPerPage(value)) // for pagination

  const onAddCard = () => {
    setIsAddNewCardDialogOpen(true)
  }

  const isEmptyPack = (): boolean => {
    return cards?.items.length === 0
  }

  // if (!data) navigate('/')

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

      <DialogAddCard
        open={isAddNewCardDialogOpen}
        setOpen={setIsAddNewCardDialogOpen}
        deckId={deckId ? deckId : ''}
      />
      <div className={s.arrowContainer} onClick={onArrowLeft}>
        <img src={arrowLeft} alt="arrowLeft" />
        <span className={s.text}>Back to Packs List</span>
      </div>

      {isLoading ? (
        <div className={s.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={sT.topContainer}>
            <div className={sT.topContainer}>
              <Typography className={sT.topHeader} variant={'H1'}>
                {data?.name}
              </Typography>
              <DropDownMenu align={'end'} className={s.dropDownMenuContent}>
                <DropdownItemWithIcon
                  icon={<Play className={s.icons} />}
                  title={'Learn'}
                  className={s.dropDownMenuItem}
                  onClick={onPlayLearn}
                ></DropdownItemWithIcon>
                {me?.id === data?.userId && (
                  <>
                    <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
                    <DropdownItemWithIcon
                      icon={<Edit className={s.icons} />}
                      className={s.dropDownMenuItem}
                      title={'Edit'}
                      onClick={onEditDeckHandler}
                    />
                    <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
                    <DropdownItemWithIcon
                      icon={<TrashHollow className={s.icons} />}
                      className={s.dropDownMenuItem}
                      title={'Delete'}
                      onClick={onDeleteDeckHandler}
                    />
                  </>
                )}
              </DropDownMenu>
            </div>

            {!isEmptyPack() && (
              <Button disabled={isEditHidden} onClick={onAddCard} className={s.button}>
                Add New Card
              </Button>
            )}
          </div>

          {isUpdateDeckDialogOpen && selectedDeck && (
            <DialogUpdatePack
              name={selectedDeck.name}
              deckId={selectedDeck.id ?? ''}
              open={isUpdateDeckDialogOpen}
              setOpen={setIsUpdateDeckDialogOpen}
              isPrivate={selectedDeck.isPrivate}
              setIsPrivate={setSelectedDeck}
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          )}

          {isDeleteDeckDialogOpen && (
            <DialogRemovePack
              open={isDeleteDeckDialogOpen}
              setOpen={setIsDeleteDeckDialogOpen}
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          )}

          {isEmptyPack() ? (
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
        </>
      )}
    </div>
  )
}
