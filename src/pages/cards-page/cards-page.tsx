import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import sC from '../decks-page/deck-page.module.scss'

import s from './cards-page.module.scss'

import arrowLeft from '@/assets/icons/ArrowLeft.svg'
import trashIcon from '@/assets/icons/trashIcon.png'
import { SelectedCardType } from '@/common/types.ts'
import { Button } from '@/components/ui/Button'
import { DialogAddNewCard } from '@/components/ui/Dialogs/DialogAddNewCard.tsx'
import { DialogRemoveCard } from '@/components/ui/Dialogs/DialogRemoveCard.tsx'
import { Column, Table } from '@/components/ui/Table'
import { Typography } from '@/components/ui/Typography'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/services/decks/decks.service.ts'

export const CardsPage = () => {
  let { id } = useParams()
  const { data } = useGetDeckByIdQuery({ id: id ? id : '' })
  const { data: cards } = useGetCardsInDeckQuery({ id: id ? id : '' })

  const [isAddNewCardDialogOpen, setIsAddNewCardDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // for delete dialog
  const [selectedCard, setSelectedCard] = useState<SelectedCardType>({
    id: '',
    question: '',
  })

  const navigate = useNavigate()

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

  return (
    <div className={sC.component}>
      <DialogRemoveCard
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <DialogAddNewCard
        open={isAddNewCardDialogOpen}
        setOpen={setIsAddNewCardDialogOpen}
        deckId={id ? id : ''}
      />
      <div className={s.arrowContainer} onClick={onArrowLeft}>
        <img src={arrowLeft} alt="arrowLeft" />
        <span className={s.text}>Back to Packs List</span>
      </div>
      <div className={sC.topContainer}>
        <Typography variant={'H1'}>{data?.name}</Typography>
        {data?.cardsCount !== 0 && (
          <Button onClick={() => setIsAddNewCardDialogOpen(true)}>Add New Card</Button>
        )}
      </div>
      {data?.cardsCount === 0 ? (
        <div className={s.emptyPackContainer}>
          <Typography variant={'Subtitle_2'} className={s.Subtitle_2}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button onClick={onOpenDialog}>Add New Card</Button>
        </div>
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
                          onClick={() => onSelectCardForDel(data.id, data.question)}
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
