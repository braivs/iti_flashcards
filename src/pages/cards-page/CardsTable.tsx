import { Edit } from '@/assets/icons/Edit.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow.tsx'
import sT from '@/common/commonStyles/tables.module.scss'
import { formatDate } from '@/common/functions.ts'
import { Button } from '@/components/ui/Button'
import { Grade } from '@/components/ui/Rating/rating.tsx'
import { Column, Table } from '@/components/ui/Table'
import { Tooltip } from '@/components/ui/Tooltip/Tooltip'
import { Card } from '@/services/cards/cards.types.ts'
import { Sort } from '@/services/common/types.ts'

export const CardsTable = (props: Props) => {
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

  const onEdit = (data: Card) => {
    props.onSelectCardForUpdate(
      data.id,
      data.question,
      data.answer,
      data.questionImg ? data.questionImg : '',
      data.answerImg ? data.answerImg : ''
    )
  }

  const onDelete = (data: Card) => {
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
                {/*TODO ask a question mentor */}
                {data.question.length > 30 ? (
                  <Tooltip triggerData={data.question} />
                ) : (
                  <div>{data.question}</div>
                )}
              </Table.Cell>
              <Table.Cell>
                {data.answerImg && (
                  <>
                    <img src={data.answerImg} alt={'answerImg'} className={sT.imgInCell} />
                    <br />
                  </>
                )}{' '}
                {/*TODO ask a question mentor */}
                {data.answer.length > 30 ? (
                  <Tooltip triggerData={data.answer} />
                ) : (
                  <div>{data.answer}</div>
                )}
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

type Props = {
  sort: Sort
  setSort: (value: Sort) => void
  items: Array<Card> | undefined
  isEditHidden: boolean
  onSelectCardForUpdate: (
    id: string,
    question: string,
    answer: string,
    questionImg?: string,
    answerImg?: string
  ) => void
  onSelectCardForDel: (id: string, question: string) => void
}
