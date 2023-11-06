import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './deck-page.module.scss'

import { Edit } from '@/assets/icons/Edit.tsx'
import { Play } from '@/assets/icons/Play.tsx'
import trashIcon from '@/assets/icons/trashIcon.png'
import { OrderByType, SelectedDeckType } from '@/common/types.ts'
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
  setItemsPerPage,
  setOrderBy,
  setSearchByName,
  updateCurrentPage,
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

  // for add dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // ===

  const { data: me } = useGetMeQuery()

  const dispatch = useAppDispatch()

  const updateCurrentPageCallback = (page: number | string) => {
    dispatch(updateCurrentPage(+page))
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

    dispatch(updateCurrentPage(1))
  }

  //Filtered Button
  const filterHandler = () => {
    dispatch(updateCurrentPage(1))
    dispatch(setAuthorId(''))
    dispatch(setCardsCounts([0, maxCardsCountHard]))
  }

  // for pagination
  //// select inside pagination
  const setItemsPerPageCallback = (value: string) => dispatch(setItemsPerPage(value))
  const selectValues = ['5', '9', '20', '50', '100']

  useEffect(() => {
    const sortString: string | undefined = sort ? `${sort?.key}-${sort?.direction}` : undefined

    dispatch(setOrderBy(sortString as OrderByType)) // todo: maybe fix this later
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

  // logging
  if (decksLoading) return <div>Loading...</div>
  if (decksIsError) return <div>Error</div>

  return (
    <div className={s.component}>
      <DialogRemovePack
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
      />
      <DialogAddPack open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
      <DialogUpdatePack
        deckId={selectedDeck.id ?? ''}
        open={isUpdateDialogOpen}
        setOpen={setIsUpdateDialogOpen}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
      />
      <div className={s.topContainer}>
        <Typography variant="Large">Packs list</Typography>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Pack</Button>
      </div>
      <div className={s.middleContainer}>
        <div className={s.searchContainer}>
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
        />
        <Button variant="secondary" onClick={filterHandler}>
          <img src={trashIcon} alt="trashIcon" className={s.trashIcon} />
          Clear Filter
        </Button>
      </div>

      <Table.Root className={s.tableContainer}>
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
                    <div className={s.iconContainer}>
                      {/*  <img
                        src={trashIcon}
                        alt=""
                        className={s.trashIcon}
                        onClick={() => onSelectDeckForDel(deck.id, deck.name)}
                      />*/}
                      <Button
                        variant={'link'}
                        onClick={() => navigate(`learn/${deck.name}/${deck.id}`)}
                      >
                        <Play color={'white'} />
                      </Button>
                      <Button
                        variant={'link'}
                        onClick={() => onSelectDeckForUpdate(deck.id, deck.name, deck.isPrivate)}
                      >
                        <Edit color={'white'} />
                      </Button>
                      <Button variant={'link'}>
                        <img
                          src={trashIcon}
                          alt=""
                          className={s.trashIcon}
                          onClick={() => onSelectDeckForDel(deck.id, deck.name)}
                        />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table.Root>

      <div className={s.paginationContainer}>
        <div>
          <Pagination
            onPageChange={updateCurrentPageCallback}
            totalCount={decks?.pagination.totalItems ?? 0}
            currentPage={currentPage}
            pageSize={+itemsPerPage}
            siblingCount={2}
            selectSettings={{
              value: itemsPerPage,
              onChangeOption: setItemsPerPageCallback,
              arr: selectValues,
            }}
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}
