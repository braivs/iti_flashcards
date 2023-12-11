import sT from '@/common/commonStyles/tables.module.scss'
import { Column, Table } from '@/components/ui/Table'
import { formatDate } from '@/common/functions.ts'
import { Grade } from '@/components/ui/Rating/rating.tsx'
import { Button } from '@/components/ui/Button'
import { Edit } from '@/assets/icons/Edit.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import { Sort } from '@/services/common/types.ts'
import { CardType } from '@/services/decks/deck.types.ts'

export const CardsTable = (props: PropsType) => {
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

  const onEdit = (data: CardType) => {
    props.onSelectCardForUpdate(data.id, data.question, data.answer)
  }

  const onDelete = (data: CardType) => {
    props.onSelectCardForDel(data.id, data.question)
  }

  return (
    <Table.Root className={sT.tableContainer}>
      <Table.Header columns={columns} onSort={props.setSort} sort={props.sort} />
      <Table.Body>
        {props.items?.map(data => {
          return (
            <Table.Row key={data.id}>
              <Table.Cell>
                {data.questionImg && (
                  <>
                    <img src={data.questionImg} alt={'questionImg'} className={sT.imgInCell} />
                    <br />
                  </>
                )}{' '}
                {data.question}
              </Table.Cell>
              <Table.Cell>
                {data.answerImg && (
                  <>
                    <img src={data.answerImg} alt={'answerImg'} className={sT.imgInCell} />
                    <br />
                  </>
                )}{' '}
                {data.answer}
              </Table.Cell>
              <Table.Cell>{formatDate(data.updated)}</Table.Cell>
              <Table.Cell>
                <Grade value={data.grade} />
              </Table.Cell>
              <Table.Cell>
                <div className={sT.iconContainer}>
                  {!props.isEditHidden && (
                    <>
                      <Button
                        variant={'link'}
                        onClick={() => {
                          onEdit(data)
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant={'link'}
                        onClick={() => {
                          onDelete(data)
                        }}
                      >
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
  sort: Sort
  setSort: (value: Sort) => void
  items: Array<CardType> | undefined
  isEditHidden: boolean
  onSelectCardForUpdate: (id: string, question: string, answer: string) => void
  onSelectCardForDel: (id: string, question: string) => void
}
