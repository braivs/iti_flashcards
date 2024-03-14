import {ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState} from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import {clsx} from 'clsx'

import s from './slider.module.scss'

import {Typography} from '@/components/ui/Typography'
import {useAppDispatch} from "@/hooks.ts"
import {setCardsCounts} from "@/services/decks/decks.slice.ts"

export const Slider = forwardRef<
    ElementRef<typeof SliderPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, name, title, value, defaultValue, onValueChange, onValueCommit, step, min, max, minStepsBetweenThumbs, ...props }, ref) => {
    const dispatch = useAppDispatch();

    // Устанавливаем начальное значение для слайдера с учетом value или defaultValue
    const initialValue = value || defaultValue || [min || 0, max || 100]; // Установите подходящие значения по умолчанию
    const [internalValue, setInternalValue] = useState<number[]>(initialValue);

    // Синхронизируем внутреннее состояние со значениями из пропсов, если они изменяются
    useEffect(() => {
        if (value) {
            setInternalValue(value);
        }
    }, [value]);

    const handleValueChange = (newValues: number[]) => {
        setInternalValue(newValues);
        if (onValueChange) {
            onValueChange(newValues);
        }
        dispatch(setCardsCounts(newValues));
    };

    const handleCommit = () => {
        if (onValueCommit) {
            onValueCommit(internalValue);
        }
    };

    return (
        <div>
            {title && (
                <Typography variant={'Body_2'} as={'label'} htmlFor={name}>
                    {title}
                </Typography>
            )}
            <div className={s.container}>
                <SliderPrimitive.Root
                    ref={ref}
                    className={clsx(s.root, className)}
                    value={internalValue}
                    onValueChange={handleValueChange}
                    onValueCommit={handleCommit}
                    step={step}
                    min={min}
                    max={max}
                    name={name}
                    {...props}
                >
                    <SliderPrimitive.Track className={s.track}>
                        <SliderPrimitive.Range className={s.range} />
                    </SliderPrimitive.Track>
                    {/*{internalValue.map((_, index) => (
                        <SliderPrimitive.Thumb
                            key={index}
                            className={s.thumb}
                            getAriaValueText={(value) => `${value}`}
                        />
                    ))}*/}
                </SliderPrimitive.Root>
            </div>
        </div>
    );
});
