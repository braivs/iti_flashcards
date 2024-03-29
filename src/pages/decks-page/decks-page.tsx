import { useEffect, useState } from 'react'

import sT from '../../common/commonStyles/tables.module.scss'

import trashIcon from '@/assets/icons/trashIcon.png'
import sC from '@/common/commonStyles/common.module.scss'
import { paginationSelectValues } from '@/common/constants.ts'
import { sortStringCallback } from '@/common/functions.ts'
import { DecksOrderBy, SelectedDeck } from '@/common/types.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddPack } from '@/components/ui/Dialogs/DialogAddPack.tsx'
import { DialogRemovePack } from '@/components/ui/Dialogs/DialogRemovePack.tsx'
import { DialogUpdatePack } from '@/components/ui/Dialogs/DialogUpdatePack.tsx'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { Pagination } from '@/components/ui/Pagination/Pagination.tsx'
import { Slider } from '@/components/ui/Slider/slider.tsx'
import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { TabSwitcherValues } from '@/components/ui/TabSwitcher/TabSwitcher.tsx'
import { Textfield } from '@/components/ui/Textfield'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { DecksTable } from '@/pages/decks-page/DecksTable/DecksTable.tsx'
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
  const [sliderValue, setSliderValue] = useState([cardsCounts[0], cardsCounts[1]])

  console.log(sliderValue)

  const [selectedDeck, setSelectedDeck] = useState<SelectedDeck>({
    id: '',
    name: '',
    isPrivate: false,
    cover: '',
  })

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false) // for update dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // for delete dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false) // for add dialog

  const { data: me } = useGetMeQuery()

  const dispatch = useAppDispatch()

  const updateDecksCurrentPageCallback = (page: number | string) => {
    dispatch(updateDecksCurrentPage(+page))
  }

  //for slider
  const sliderChangeHandler = () => {
    dispatch(setCardsCounts(sliderValue))
  }

  // debugger
  const {
    currentData,
    data,
    isLoading: decksLoading,
    isError: decksIsError,
  } = useGetDecksQuery({
    itemsPerPage: +itemsPerPage,
    name: searchByName,
    minCardsCount: sliderValue[0],
    maxCardsCount: sliderValue[1],
    currentPage,
    authorId,
    orderBy,
  })

  const decks = currentData ?? data

  // debugger
  //for tabSwitcher
  const tabSwitcherValues: Array<TabSwitcherValues> = [
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
    dispatch(setSearchByName(''))
    setSliderValue([0, maxCardsCountHard])
    dispatch(setCardsCounts([0, maxCardsCountHard]))
    sliderChangeHandler()
  }

  // for pagination
  //// select inside pagination
  const setDecksItemsPerPageCallback = (value: string) => dispatch(setDecksItemsPerPage(value))

  useEffect(() => {
    const sortString: string | undefined = sortStringCallback(sort)

    dispatch(setDecksOrderBy(sortString as DecksOrderBy))
  }, [sort])

  const onSelectDeckForDel = (id: string, name: string, cover: string) => {
    setIsDeleteDialogOpen(true)
    setSelectedDeck({ id, name, cover })
  }
  const onSelectDeckForUpdate = (id: string, name: string, isPrivate: boolean, cover?: string) => {
    setIsUpdateDialogOpen(true)
    setSelectedDeck({ id, name, isPrivate, cover: cover ? cover : '' })
  }

  // logging
  if (decksLoading) return <Loader />
  if (decksIsError) return <div>Error</div>

  return (
    <div className={sT.component}>
      {isDeleteDialogOpen && (
        <DialogRemovePack
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
        />
      )}
      <DialogAddPack open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
      {isUpdateDialogOpen && selectedDeck && (
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
      )}
      <div className={sT.topContainer}>
        <Typography variant="Large">Packs list</Typography>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Pack</Button>
      </div>
      <div className={sT.middleContainer}>
        <div className={sT.searchContainer}>
          <Textfield
            type={'search'}
            value={searchByName}
            onChange={e => dispatch(setSearchByName(e.currentTarget.value))}
            placeholder={'PackName...'}
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
          value={sliderValue}
          defaultValue={[1, 12]}
          onValueChange={setSliderValue}
          onValueCommit={sliderChangeHandler}
          step={1}
          min={0}
          max={decks?.maxCardsCount || maxCardsCountHard}
          minStepsBetweenThumbs={1}
          title={'Number of cards'}
        />
        <Button variant="secondary" onClick={filterHandler}>
          <img src={trashIcon} alt="trashIcon" className={sT.trashIcon} />
          Clear Filter
        </Button>
      </div>

      <div className={sT.container}>
        <DecksTable
          items={decks?.items}
          onSelectDeckForUpdate={onSelectDeckForUpdate}
          onSelectDeckForDel={onSelectDeckForDel}
          sort={sort}
          setSort={setSort}
        />
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
