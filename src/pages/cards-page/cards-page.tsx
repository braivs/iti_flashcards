import { useParams } from 'react-router-dom'

import sC from '../decks-page/deck-page.module.scss'

import s from './cards-page.module.scss'

import trashIcon from '@/assets/icons/trashIcon.png'
import { Column, Table } from '@/components/ui/Table'
import { Typography } from '@/components/ui/Typography'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/services/decks/decks.service.ts'

export const CardsPage = () => {
  let { id } = useParams()

  const { data } = useGetDeckByIdQuery({ id: id ? id : '' })

  // console.log('id: ' + id)

  const { data: cards } = useGetCardsInDeckQuery({ id: id ? id : '' })

  console.log('cards')
  console.log(cards)

  const columns: Column[] = [
    {
      key: 'Question',
      title: 'question',
      sortable: true,
    },
    {
      key: 'Answer',
      title: 'answer',
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

  return (
    <div className={sC.component}>
      <div className={sC.topContainer}>
        <Typography variant={'H1'}>{data?.name}</Typography>
      </div>
      {data?.cardsCount === 0 ? (
        <Typography variant={'Subtitle_1'}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
      ) : (
        <Table.Root className={sC.tableContainer}>
          <Table.Header columns={columns} />
          <Table.Body>
            {cards &&
              cards.items.map(data => {
                return (
                  <Table.Row key={data.id}>
                    <Table.Cell className={s.cell}>{data.question}</Table.Cell>
                    <Table.Cell className={s.cell}>{data.answer}</Table.Cell>
                    <Table.Cell>{data.updated}</Table.Cell>
                    <Table.Cell>{data.grade}</Table.Cell>
                    <Table.Cell>
                      <div className={sC.iconContainer}>
                        <img
                          src={trashIcon}
                          alt=""
                          className={sC.trashIcon}
                          onClick={() => window.alert('onDelete')}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  )
}
