import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import s from './learnModalPage.module.scss'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { LearnModal } from '@/components/ui/modal/LearnModal.tsx'
import { Typography } from '@/components/ui/Typography'
import {
  useGetCardQuery,
  useGetDeckByIdQuery,
  usePostCardMutation,
} from '@/services/decks/decks.service.ts'

export const LearnModalPage = () => {
  const params = useParams<'deckId'>()
  const navigate = useNavigate()

  const [sendGrade, { isLoading: isPostCardLoading, data }] = usePostCardMutation()
  const { data: deckData } = useGetDeckByIdQuery({ id: params?.deckId ?? '' })

  const title = deckData?.name ?? ''
  const deckId1 = params.deckId

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
    return <Loader />
  }

  const errorData = error && error?.data

  const notify = () => {
    toast.error(errorData.message, { theme: 'colored', autoClose: 2000 })
  }

  if (isError && !isFetching) {
    // return <ErrorPage errorMessage={error?.data?.message} />

    notify()

    return (
      <div className={s.body}>
        <Typography variant={'Body_1'} className={s.text}>
          {errorData.message}
        </Typography>
        <ToastContainer position={'top-center'} />
        <Link to={'/'}>
          <Button variant={'primary'}>Back to decks page</Button>
        </Link>
      </div>
    )
  }

  const cardData = data || dataGet

  return (
    <div className={s.wrapper}>
      {cardData && (
        <LearnModal
          id={cardData.id}
          title={title ? title : 'Title'}
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
