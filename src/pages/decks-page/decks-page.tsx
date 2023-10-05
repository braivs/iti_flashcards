import { useEffect, useState } from 'react'

import s from './deck-page.module.scss'

import trashIcon from '@/assets/icons/trashIcon.png'
import { FieldType } from '@/common/types.ts'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination/Pagination.tsx'
import { Column, Table } from '@/components/ui/Table'
import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { TabSwitcherValuesType } from '@/components/ui/TabSwitcher/TabSwitcher.tsx'
import { Textfield } from '@/components/ui/Textfield'
import { Typography } from '@/components/ui/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { Sort } from '@/services/common/types.ts'
import { Deck } from '@/services/decks/deck.types.ts'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service.ts'
import { setItemsPerPage, updateCurrentPage } from '@/services/decks/decks.slice.ts'

export const DecksPage = () => {
  const { selectValues, itemsPerPage, currentPage } = useAppSelector(state => state.decks)
  const [authorId, setAuthorId] = useState('')
  const [orderBy, setOrderBy] = useState<FieldType | undefined>(undefined)
  const { data: me } = useGetMeQuery()

  const dispatch = useAppDispatch()

  const updateCurrentPageCallback = (page: number | string) => {
    dispatch(updateCurrentPage(+page))
  }
  const [search, setSearch] = useState('')
  const {
    currentData: decks,
    isLoading: decksLoading,
    isError: decksIsError,
  } = useGetDecksQuery({
    itemsPerPage: +itemsPerPage,
    name: search,
    currentPage,
    authorId,
    orderBy,
  })

  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  // for sorting cells in table
  const [sort, setSort] = useState<Sort>(null)

  //for tabSwitcher
  const tabSwitcherValues: Array<TabSwitcherValuesType> = [
    { index: 1, value: 'MyCards', text: 'My Cards' },
    { index: 2, value: 'AllCards', text: 'All Cards' },
  ]
  const onTabChange = (value: string) => {
    if (value === 'MyCards') {
      setAuthorId(me.id)
    } else {
      setAuthorId('')
    }
  }

  // for pagination
  //// select inside pagination
  const setItemsPerPageCallback = (value: string) => dispatch(setItemsPerPage(value))

  useEffect(() => {
    const sortString: string | undefined = sort ? `${sort?.key}-${sort?.direction}` : undefined

    console.log(sortString)
    setOrderBy(sortString)
  }, [sort])

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
      <div className={s.topContainer}>
        <Typography variant="Large">Packs list</Typography>
        <Button
          onClick={() => {
            dispatch(updateCurrentPage(1))
            createDeck({ name: 'New Deck 4' })
          }}
          disabled={isLoading}
        >
          Add New Pack
        </Button>
      </div>
      <div className={s.middleContainer}>
        <div className={s.searchContainer}>
          <Textfield
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            placeholder={'Input search'}
          />
        </div>
        <TabSwitcher
          onChangeCallback={onTabChange}
          values={tabSwitcherValues}
          defaultValue={'AllCards'}
          label={'Show packs cards'}
        />
      </div>
      <Table.Root className={s.tableContainer}>
        <Table.Header columns={columns} onSort={setSort} sort={sort} />
        <Table.Body>
          {decks?.items &&
            decks.items.map(deck => {
              return (
                <Table.Row key={deck.id}>
                  <Table.Cell>{deck.name}</Table.Cell>
                  <Table.Cell>{deck.cardsCount}</Table.Cell>
                  <Table.Cell>{deck.updated}</Table.Cell>
                  <Table.Cell>{deck.author.name}</Table.Cell>
                  <Table.Cell>
                    <div className={s.iconContainer}>
                      <img
                        src={trashIcon}
                        alt=""
                        className={s.trashIcon}
                        onClick={() =>
                          deleteDeck({ id: deck.id })
                            .unwrap()
                            .catch(err => {
                              alert(err?.data?.message)
                            })
                        }
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table.Root>

      <div className={s.paginationContainer}>
        {decks && (
          <div>
            <Pagination
              onPageChange={updateCurrentPageCallback}
              totalCount={decks.pagination.totalItems}
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
        )}
      </div>
    </div>
  )
}

// todo: I`m not using pagination.totalPages, maybe later need to check
