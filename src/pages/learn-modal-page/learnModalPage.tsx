import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

import s from './learnModalPage.module.scss'

import { LearnModal } from '@/components/ui/modal/LearnModal.tsx'
import { useGetCardQuery, usePostCardMutation } from '@/services/decks/decks.service.ts'

export const LearnModalPage = () => {
  const params = useParams<'deckTitle' | 'deckId'>()
  const navigate = useNavigate()
  const location = useLocation()

  const [sendGrade, { isLoading: isPostCardLoading, data }] = usePostCardMutation()

  const pathArray = location.pathname.split('/')
  let deckId1, title

  if (pathArray.length > 4) {
    deckId1 = pathArray[pathArray.length - 1]

    pathArray.pop()
    title = decodeURI(pathArray.slice(2).join(''))
  }

  const {
    data: dataGet,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetCardQuery({
    deckId: deckId1 || (params.deckId ? params.deckId : ''),
  })

  if (isLoading || isFetching || isPostCardLoading) {
    return <div>Loading...</div>
  }
  console.log(error)

  if (isError) {
    // return <ErrorPage errorMessage={error?.data?.message} />
    return <Navigate to={'/error-clean-pack'} />
  }

  const cardData = data || dataGet

  return (
    <div className={s.wrapper}>
      {cardData && (
        <LearnModal
          id={cardData.id}
          title={title || (params.deckTitle ? params.deckTitle : 'Title')}
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
