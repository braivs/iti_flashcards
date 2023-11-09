import { useNavigate, useParams } from 'react-router-dom'

import s from './learnModalPage.module.scss'

import { LearnModal } from '@/components/ui/modal/LearnModal.tsx'
import { useGetCardQuery, usePostCardMutation } from '@/services/decks/decks.service.ts'

export const LearnModalPage = () => {
  const params = useParams<'deckTitle' | 'deckId'>()
  const navigate = useNavigate()

  const [sendGrade, { isLoading: isPostCardLoading, data }] = usePostCardMutation()

  const {
    data: dataGet,
    isLoading,
    isFetching,
  } = useGetCardQuery({
    deckId: params.deckId ? params.deckId : '',
  })

  if (isLoading || isFetching || isPostCardLoading) {
    // setOpen(true)

    return <div>Loading...</div>
  }

  const cardData = data || dataGet

  return (
    <div className={s.wrapper}>
      {cardData && (
        <LearnModal
          id={cardData.id}
          title={params.deckTitle ? params.deckTitle : 'Title'}
          question={cardData.question}
          answer={cardData.answer}
          shots={cardData.shots}
          navigate={navigate}
          onChange={sendGrade}
          imgAnswer={cardData.answerImg}
          imgQuestion={cardData.questionImg}
        />
      )}
    </div>
  )
}
