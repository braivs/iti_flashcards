import { FC, useState } from 'react'

// import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import { RadioGroup } from '../RadioGroup/RadioGroup'

import s from './LearnModal.module.scss'

import { ArrowBack } from '@/assets/icons/ArrowBack.tsx'
import { MyYouTube } from '@/common/MyYouTube/MyYouTube.tsx'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { extractYouTubeVideoId } from '@/components/ui/Dialogs/common/utils.ts'
import { Typography } from '@/components/ui/Typography'
import { DeckLearnArg } from '@/services/decks/deck.types.ts'

type LearnModalType = {
  id: string
  title: string
  question: string
  answer: string
  shots: number
  navigate: (to: string) => void
  onChange: ({ grade, cardId }: DeckLearnArg) => void
  imgAnswer: string | null
  imgQuestion: string | null
  questionVideo: string | null
  answerVideo: string | null
}

export const answerRaiting = [
  { id: '1', value: '1', label: 'Did not know' },
  { id: '2', value: '2', label: 'Forgot' },
  { id: '3', value: '3', label: 'A lot of thought' },
  { id: '4', value: '4', label: 'Сonfused' },
  { id: '5', value: '5', label: 'Knew the answer' },
]

export const LearnModal: FC<LearnModalType> = ({
  title,
  answer,
  question,
  shots,
  navigate,
  onChange,
  id,
  imgAnswer,
  imgQuestion,
  questionVideo,
  answerVideo,
}) => {
  const [hiddenRaiting, setHiddenRaiting] = useState(false)

  const [value, setValue] = useState(answerRaiting[0].value)

  const questionVideoId = extractYouTubeVideoId(questionVideo ? questionVideo : '').videoId
  const answerVideoId = extractYouTubeVideoId(answerVideo ? answerVideo : '').videoId
  const sendMessageHandler = () => {
    onChange && onChange({ cardId: id, grade: +value })
    setHiddenRaiting(false)
    // setOpen(false)
  }

  const showAnswerHandler = () => {
    setHiddenRaiting(true)
  }

  const classNames = {
    closeButtonContainer: s.closeButtonContainer,
    closeButton: s.closeButtonText,
    learnModalContainer: s.learnModalContainer,
    cardWrapper: s.cardWrapper,
    cardTitle: s.title,
    gradeWrapper: s.gradeWrapper,
    questionWrapper: clsx(s.questionWrapper),
    questionTitle: clsx(s.questionTitle, imgQuestion && s.marginBlock),
    questionImg: clsx(s.questionImg, imgQuestion && s.marginBlock),
    shotsText: clsx(s.shotsText, imgQuestion && s.bond, hiddenRaiting && s.subBond),
    answerTitle: clsx(s.answerTitle, imgAnswer && s.answerMargin),
  }

  return (
    <div className={classNames.learnModalContainer}>
      <div className={classNames.closeButtonContainer}>
        <Button variant={'link'} className={classNames.closeButton} onClick={() => navigate('/')}>
          <ArrowBack color={'white'} className={s.closeButtonIcon} />
          <Typography variant={'Body_2'}>Back to Pack List</Typography>
        </Button>
      </div>

      <Card className={classNames.cardWrapper}>
        <Typography variant={'Large'} className={classNames.cardTitle}>
          {`Learn "${title}"`}{' '}
        </Typography>
        {/*Question wrapper*/}
        <div className={classNames.questionWrapper}>
          <Typography variant={'Subtitle_1'} className={classNames.questionTitle}>
            Question:{' '}
            <Typography variant={'Body_1'} className={s.questionSubtitle}>
              {question}
            </Typography>
          </Typography>
          {imgQuestion && (
            <img src={imgQuestion} alt="imgQuestion" className={classNames.questionImg} />
          )}
          {questionVideo && <MyYouTube videoId={questionVideoId} />}
        </div>
        {/*Count wrapper*/}
        <div className={s.countWrapper}>
          <Typography variant={'Body_2'} className={classNames.shotsText}>
            Количество попыток ответов на вопрос:{' '}
            <Typography variant={'Subtitle_2'} className={s.shotsCount}>
              {shots}
            </Typography>
          </Typography>
        </div>
        {/*Answer wrapper*/}
        {hiddenRaiting && (
          <div className={s.answerWrapper}>
            <Typography variant={'Subtitle_1'} className={classNames.answerTitle}>
              {`Answer: `}
              <Typography variant={'Body_1'} className={s.answerSubtitle}>
                {answer}
              </Typography>
            </Typography>
            {imgAnswer && <img src={imgAnswer} alt="imgAnswer" className={s.answerImg} />}
            {answerVideo && <MyYouTube videoId={answerVideoId} />}
            <Typography variant={'Subtitle_1'}>Rate yourself:</Typography>
            <div className={classNames.gradeWrapper}>
              <RadioGroup
                options={answerRaiting}
                value={value}
                onValueChange={e => {
                  setValue(e)
                }}
              ></RadioGroup>
            </div>
          </div>
        )}
        {hiddenRaiting ? (
          <Button onClick={sendMessageHandler} fullWidth={true}>
            {' '}
            Next question{' '}
          </Button>
        ) : (
          <Button onClick={showAnswerHandler} fullWidth={true}>
            {' '}
            Show Answer
          </Button>
        )}
      </Card>
    </div>
  )
}
