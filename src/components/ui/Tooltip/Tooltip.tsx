import { FC } from 'react'

import * as RTooltip from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'

import s from './Tooltip.module.scss'

import { Typography } from '@/components/ui/Typography'

type TooltipProps = {
  triggerData: string
  className?: string
  titleLength?: number
  tooltipSide?: 'top' | 'bottom' | 'right' | 'left'
}

export const Tooltip: FC<TooltipProps> = ({ triggerData, className, titleLength, ...props }) => {
  const classNames = {
    content: clsx(s.TooltipContent, className),
  }
  let finalTitle = triggerData.slice(0, titleLength ? titleLength : 30) + '...'

  return (
    <div>
      <RTooltip.Provider delayDuration={500}>
        <RTooltip.Root>
          <RTooltip.Trigger>
            <Typography variant={'Body_2'}>{finalTitle}</Typography>
          </RTooltip.Trigger>
          <RTooltip.Portal>
            <RTooltip.Content
              side={'top'}
              align={'start'}
              sideOffset={5}
              className={classNames.content}
              {...props}
            >
              <Typography variant={'Body_2'}>{triggerData}</Typography>
              {/*<RTooltip.Arrow />*/}
            </RTooltip.Content>
          </RTooltip.Portal>
        </RTooltip.Root>
      </RTooltip.Provider>
    </div>
  )
}
