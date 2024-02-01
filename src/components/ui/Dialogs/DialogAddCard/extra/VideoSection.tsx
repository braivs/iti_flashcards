import { useState } from 'react'

import sC from '@/components/ui/Dialogs/common/Dialogs.module.scss'
import { extractYouTubeVideoId } from '@/components/ui/Dialogs/common/utils.ts'
import { ApproveCancelTextField } from '@/components/ui/Dialogs/DialogAddCard/extra/ApproveCancelTextField.tsx'
import { VideoElement } from '@/components/ui/Dialogs/DialogAddCard/extra/VideoElement.tsx'
import sP from '@/components/ui/Dialogs/DialogsParent/DialogsParent.module.scss'
import { Typography } from '@/components/ui/Typography'

export const VideoSection = (props: Props) => {
  const [isQuestionEdit, setIsQuestionEdit] = useState(false)
  const [isAnswerEdit, setIsAnswerEdit] = useState(false)

  const [tempQuestionUrl, setTempQuestionUrl] = useState(props.youtubeQuestionUrl)
  const [tempAnswerUrl, setTempAnswerUrl] = useState(props.youtubeAnswerUrl)

  const { videoId: questionVideoId, success: questionVideoIdStatus } =
    extractYouTubeVideoId(tempQuestionUrl)
  const { videoId: answerVideoId, success: answerVideoIdStatus } =
    extractYouTubeVideoId(tempAnswerUrl)

  const onQuestionChangeVideo = () => {
    setIsQuestionEdit(true)
  }

  const onAnswerChangeVideo = () => {
    setIsAnswerEdit(true)
  }

  const onQuestionApprove = () => {
    if (questionVideoIdStatus && questionVideoId) {
      props.setYoutubeQuestionUrl(tempQuestionUrl)
      setIsQuestionEdit(false)
    } else {
      alert('wrong question link')
    }
  }

  const onAnswerApprove = () => {
    if (answerVideoIdStatus && answerVideoId) {
      props.setYoutubeAnswerUrl(tempAnswerUrl)
      setIsAnswerEdit(false)
    } else {
      alert('wrong answer link')
    }
  }

  const onQuestionCancel = () => {
    setIsQuestionEdit(false)
  }

  const onAnswerCancel = () => {
    setIsAnswerEdit(false)
  }

  return (
    <div className={sP.sectionContainer}>
      <div className={sP.elementContainer}>
        <Typography variant={'Body_2'} className={sP.greyText}>
          Video question
        </Typography>
        <div className={sC.antiTwitchVideoCont}>
          {!isQuestionEdit ? (
            <VideoElement
              youtubeUrl={props.youtubeQuestionUrl}
              questionVideoIdStatus={questionVideoIdStatus}
              questionVideoId={questionVideoId}
              onQuestionChangeVideo={onQuestionChangeVideo}
            />
          ) : (
            <ApproveCancelTextField
              tempValue={tempQuestionUrl}
              setTempValue={setTempQuestionUrl}
              onApprove={onQuestionApprove}
              onCancel={onQuestionCancel}
              label={'Question Youtube id'}
            />
          )}
        </div>
      </div>
      <div className={sP.elementContainer}>
        <Typography variant={'Body_2'} className={sP.greyText}>
          Video answer
        </Typography>
        <div className={sC.antiTwitchVideoCont}>
          {!isAnswerEdit ? (
            <VideoElement
              youtubeUrl={props.youtubeAnswerUrl}
              questionVideoIdStatus={answerVideoIdStatus}
              questionVideoId={answerVideoId}
              onQuestionChangeVideo={onAnswerChangeVideo}
            />
          ) : (
            <ApproveCancelTextField
              tempValue={tempAnswerUrl}
              setTempValue={setTempAnswerUrl}
              onApprove={onAnswerApprove}
              onCancel={onAnswerCancel}
              label={'Answer Youtube id'}
            />
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  setYoutubeQuestionUrl: (value: string) => void
  setYoutubeAnswerUrl: (value: string) => void
  youtubeQuestionUrl: string
  youtubeAnswerUrl: string
}
