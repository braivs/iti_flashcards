import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import sT from '../../common/commonStyles/tables.module.scss'

import { Edit } from '@/assets/icons/Edit.tsx'
import { Play } from '@/assets/icons/Play.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import trashIcon from '@/assets/icons/trashIcon.png'
import sC from '@/common/commonStyles/common.module.scss'
import { DecksOrderByType, SelectedDeckType } from '@/common/types.ts'
import { paginationSelectValues } from '@/common/values.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddPack } from '@/components/ui/Dialogs/DialogAddPack.tsx'
import { DialogRemovePack } from '@/components/ui/Dialogs/DialogRemovePack.tsx'
import { DialogUpdatePack } from '@/components/ui/Dialogs/DialogUpdatePack.tsx'
import { Pagination } from '@/components/ui/Pagination/Pagination.tsx'
import { Slider } from '@/components/ui/Slider/slider.tsx'
import { Column, Table } from '@/components/ui/Table'
import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { TabSwitcherValuesType } from '@/components/ui/TabSwitcher/TabSwitcher.tsx'
import { Textfield } from '@/components/ui/Textfield'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { maxCardsCountHard } from '@/pages/decks-page/maxCardsCount.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { Sort } from '@/services/common/types.ts'
import { useGetDecksQuery } from '@/services/decks/decks.service.ts'
import {
  setAuthorId,
  setCardsCounts,
  setDecksItemsPerPage,
  setDecksOrderBy,
  setSearchByName,
  updateDecksCurrentPage,
} from '@/services/decks/decks.slice.ts'

export const DecksPage = () => {
  const { itemsPerPage, searchByName, cardsCounts, currentPage, authorId, orderBy } =
    useAppSelector(state => state.decks)

  const [sort, setSort] = useState<Sort>(null) // for sorting cells in table

  const [selectedDeck, setSelectedDeck] = useState<SelectedDeckType>({
    id: '',
    name: '',
    isPrivate: false,
  })
  const navigate = useNavigate()

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false) // for update dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // for delete dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false) // for add dialog

  const { data: me } = useGetMeQuery()

  const dispatch = useAppDispatch()

  const updateDecksCurrentPageCallback = (page: number | string) => {
    dispatch(updateDecksCurrentPage(+page))
  }

  //for slider
  // const [value, setValue] = useState<number[]>([0, maxCardsCountHard])
  const sliderChangeHandler = (newValue: number[]) => {
    dispatch(setCardsCounts(newValue))
  }
  const {
    currentData: decks,
    isLoading: decksLoading,
    isError: decksIsError,
  } = useGetDecksQuery({
    itemsPerPage: +itemsPerPage,
    name: searchByName,
    minCardsCount: cardsCounts[0],
    maxCardsCount: cardsCounts[1],
    currentPage,
    authorId,
    orderBy,
  })

  const onSelectDeckForDel = (id: string, name: string) => {
    setIsDeleteDialogOpen(true)
    setSelectedDeck({ id, name })
  }
  const onSelectDeckForUpdate = (id: string, name: string, isPrivate: boolean) => {
    setIsUpdateDialogOpen(true)
    setSelectedDeck({ id, name, isPrivate })
  }

  //for tabSwitcher
  const tabSwitcherValues: Array<TabSwitcherValuesType> = [
    { index: 1, value: 'MyCards', text: 'My Cards' },
    { index: 2, value: 'AllCards', text: 'All Cards' },
  ]
  const onTabChange = (value: string) => {
    if (value === 'MyCards') {
      dispatch(setAuthorId(me.id))
    } else {
      dispatch(setAuthorId(''))
    }

    dispatch(updateDecksCurrentPage(1))
  }

  //Filtered Button
  const filterHandler = () => {
    dispatch(updateDecksCurrentPage(1))
    dispatch(setAuthorId(''))
    dispatch(setCardsCounts([0, maxCardsCountHard]))
  }

  // for pagination
  //// select inside pagination
  const setDecksItemsPerPageCallback = (value: string) => dispatch(setDecksItemsPerPage(value))

  useEffect(() => {
    const sortString: string | undefined = sort ? `${sort?.key}-${sort?.direction}` : undefined //todo: remove duplicate with cards-page

    dispatch(setDecksOrderBy(sortString as DecksOrderByType)) // todo: maybe fix this later
  }, [sort])

  const onViewDeck = (packId: string) => {
    // window.alert(`Edit pack with id: ${packId}`)
    navigate(`/cards/${packId}`)
  }

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'cardsCount',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'created',
      title: 'Created by',
      sortable: true,
    },
    {
      key: 'options',
      title: '',
    },
  ]

  const isEqualToMeId = (deckAuthorId: string): boolean => deckAuthorId === me.id

  const cursorByAuthorId = (deckAauthorId: string) =>
    isEqualToMeId(deckAauthorId) ? '' : sT.cursorAuto

  const colorByAuthorId = (deckAauthorId: string): 'white' | 'grey' =>
    isEqualToMeId(deckAauthorId) ? 'white' : 'grey'

  // logging
  if (decksLoading) return <div>Loading...</div>
  if (decksIsError) return <div>Error</div>

  return (
    <div className={sT.component}>
      <DialogRemovePack
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
      />
      <DialogAddPack open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
      <DialogUpdatePack
        name={selectedDeck.name}
        deckId={selectedDeck.id ?? ''}
        open={isUpdateDialogOpen}
        setOpen={setIsUpdateDialogOpen}
        isPrivate={selectedDeck.isPrivate}
        setIsPrivate={setSelectedDeck}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
      />
      <div className={sT.topContainer}>
        <Typography variant="Large">Packs list</Typography>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Pack</Button>
      </div>
      <div className={sT.middleContainer}>
        <div className={sT.searchContainer}>
          <Textfield
            value={searchByName}
            onChange={e => dispatch(setSearchByName(e.currentTarget.value))}
            placeholder={'Input search'}
          />
        </div>
        <TabSwitcher
          onChangeCallback={onTabChange}
          values={tabSwitcherValues}
          defaultValue={tabSwitcherValues[0].value as string}
          value={tabSwitcherValues[authorId ? 0 : 1].value as string}
          label={'Show packs cards'}
        />
        <Slider
          value={cardsCounts}
          defaultValue={[1]}
          onValueChange={sliderChangeHandler}
          step={1}
          min={0}
          max={decks?.maxCardsCount || maxCardsCountHard}
          minStepsBetweenThumbs={1}
          className={sT.slider}
        />
        <Button variant="secondary" onClick={filterHandler}>
          <img src={trashIcon} alt="trashIcon" className={sT.trashIcon} />
          Clear Filter
        </Button>
      </div>

      <div className={sT.container}>
        <Table.Root className={sT.tableContainer}>
          <Table.Header columns={columns} onSort={setSort} sort={sort} />
          <Table.Body>
            {decks?.items &&
              decks.items.map(deck => {
                return (
                  <Table.Row key={deck.id}>
                    <Table.Cell onDoubleClick={() => onViewDeck(deck.id)}>{deck.name}</Table.Cell>
                    <Table.Cell>{deck.cardsCount}</Table.Cell>
                    <Table.Cell>{deck.updated}</Table.Cell>
                    <Table.Cell>{deck.author.name}</Table.Cell>
                    <Table.Cell>
                      <div className={sT.iconContainer}>
                        <Button
                          variant={'link'}
                          onClick={
                            deck.cardsCount > 0
                              ? () => navigate(`learn/${deck.name}/${deck.id}`)
                              : () => {}
                          }
                          className={deck.cardsCount > 0 ? '' : sT.cursorAuto}
                        >
                          <Play color={deck.cardsCount > 0 ? 'white' : 'grey'} />
                        </Button>
                        <Button
                          variant={'link'}
                          className={cursorByAuthorId(deck.author.id)}
                          onClick={
                            isEqualToMeId(deck.author.id)
                              ? () => onSelectDeckForUpdate(deck.id, deck.name, deck.isPrivate)
                              : () => {}
                          }
                        >
                          <Edit color={colorByAuthorId(deck.author.id)} />
                        </Button>
                        <Button
                          variant={'link'}
                          onClick={
                            isEqualToMeId(deck.author.id)
                              ? () => onSelectDeckForDel(deck.id, deck.name)
                              : () => {}
                          }
                          className={cursorByAuthorId(deck.author.id)}
                        >
                          <TrashHollow color={colorByAuthorId(deck.author.id)} />
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
          onPageChange={updateDecksCurrentPageCallback}
          totalCount={decks?.pagination.totalItems ?? 0}
          currentPage={currentPage}
          pageSize={+itemsPerPage}
          siblingCount={2}
          selectSettings={{
            value: itemsPerPage,
            onChangeOption: setDecksItemsPerPageCallback,
            arr: paginationSelectValues,
          }}
        />
      </div>
    </div>
  )
}
