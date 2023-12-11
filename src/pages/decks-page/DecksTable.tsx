import sT from '@/common/commonStyles/tables.module.scss'
import { Column, Table } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { formatDate } from '@/common/functions.ts'
import { Play } from '@/assets/icons/Play.tsx'
import { Edit } from '@/assets/icons/Edit.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import { Sort } from '@/services/common/types.ts'
import { DeckType } from '@/services/decks/deck.types.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

export const DecksTable = (props: PropsType) => {
  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
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

  const { data: me } = useGetMeQuery()

  const isEditHidden = (deck: DeckType): boolean => deck.author.id !== me.id

  const onEdit = (deck: DeckType) => {
    props.onSelectDeckForUpdate(deck.id, deck.name, deck.isPrivate)
  }

  const onDelete = (deck: DeckType) => {
    props.onSelectDeckForDel(deck.id, deck.name)
  }

  return (
    <Table.Root className={sT.tableContainer}>
      <Table.Header columns={columns} onSort={props.setSort} sort={props.sort} />
      <Table.Body>
        {props.items &&
          props.items.map(deck => {
            return (
              <Table.Row key={deck.id}>
                <Table.Cell>
                  <Button as={Link} variant={'link'} to={`cards/${deck.id}`}>
                    {deck.name}
                  </Button>
                </Table.Cell>
                <Table.Cell>{deck.cardsCount}</Table.Cell>
                <Table.Cell>{formatDate(deck.updated)}</Table.Cell>
                <Table.Cell>{deck.author.name}</Table.Cell>
                <Table.Cell>
                  <div className={sT.iconContainer}>
                    <Button as={Link} variant={'link'} to={`learn/${deck.name}/${deck.id}`}>
                      <Play />
                    </Button>
                    {!isEditHidden(deck) && (
                      <>
                        <Button variant={'link'} onClick={() => onEdit(deck)}>
                          <Edit />
                        </Button>
                        <Button variant={'link'} onClick={() => onDelete(deck)}>
                          <TrashHollow />
                        </Button>
                      </>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            )
          })}
      </Table.Body>
    </Table.Root>
  )
}

type PropsType = {
  items: DeckType[] | undefined
  onSelectDeckForUpdate: (id: string, name: string, isPrivate: boolean) => void
  onSelectDeckForDel: (id: string, name: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}
