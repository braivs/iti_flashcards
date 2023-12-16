import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, name, max, ...props }, ref) => (
  <div className={s.container}>
    <span className={s.value}>{props?.value?.[0]}</span>
    <SliderPrimitive.Root ref={ref} className={clsx(s.root, className)} {...props}>
      <SliderPrimitive.Track className={s.track}>
        <SliderPrimitive.Range className={s.range} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={s.thumb} />
      <SliderPrimitive.Thumb className={s.thumb} />
    </SliderPrimitive.Root>
    <span className={s.value}>{max}</span>
  </div>
))
