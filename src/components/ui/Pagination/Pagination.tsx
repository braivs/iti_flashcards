import { useEffect, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { v4 } from 'uuid'

import s from './Pagination.module.scss'
import { usePagination, DOTS } from './usePagination.ts'

import { Select } from '@/components/ui/Select'

export const Pagination = (props: PropsType) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1]

  const [isChevronLeftDisabled, setIsChevronLeftDisabled] = useState(false)
  const [isChevronRightDisabled, setIsChevronRightDisabled] = useState(false)
  const [paginationIsBlocked, setPaginationIsBlocked] = useState(false)

  useEffect(() => {
    setIsChevronLeftDisabled(currentPage == 1)

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
      setPaginationIsBlocked(true)
    } else {
      setPaginationIsBlocked(false)
    }

    setIsChevronRightDisabled(currentPage === lastPage)
  }, [currentPage, paginationRange, lastPage])

  const isSelected = (pageNumber: number) => {
    return pageNumber === currentPage
  }

  return (
    <div className={clsx(s.paginationContainer, className)}>
      <div
        className={clsx(s.paginationItem, isChevronLeftDisabled && s.disabled)}
        onClick={!isChevronLeftDisabled && !paginationIsBlocked ? onPrevious : () => {}}
      >
        <ChevronLeftIcon
          className={isChevronLeftDisabled || paginationIsBlocked ? s.disabled : ''}
        />
      </div>
      {paginationRange &&
        paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return (
              <div key={v4()} className={clsx(s.paginationItem, s.dots)}>
                ...
              </div>
            )
          }

          return (
            <div
              key={v4()}
              className={clsx(s.paginationItem, {
                [s.selected]: isSelected(+pageNumber),
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          )
        })}
      <div
        className={clsx(s.paginationItem, {
          [s.disabled]: isChevronRightDisabled || paginationIsBlocked,
        })}
        onClick={!isChevronRightDisabled && !paginationIsBlocked ? onNext : () => {}}
      >
        <ChevronRightIcon />
      </div>
      <div className={s.selectBlock}>
        <span className={s.label1}>Show</span>
        <div className={s.selectContainer}>
          <Select
            options={props.selectSettings.arr}
            value={props.selectSettings.value}
            onChangeOption={props.selectSettings.onChangeOption}
            isGreyColor={true}
          />
        </div>
        <span className={s.label2}>decks per page</span>
      </div>
    </div>
  )
}

type PropsType = {
  onPageChange: (value: number | string) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
  selectSettings: {
    // setting for Select
    value: string
    onChangeOption: (value: string) => void
    arr: Array<string>
  }
}
