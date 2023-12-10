import type {QRL, Signal} from "@builder.io/qwik";
import {$, component$, useSignal, useTask$, useVisibleTask$} from "@builder.io/qwik";
import {isBrowser} from "@builder.io/qwik/build";

export interface MultiRangeSliderProps {
    min: number,
    max: number,
    onChange: QRL<(data: { min: number, max: number }) => void>,
    minValue: Signal<number>,
    maxValue: Signal<number>,
}

export const MultiRangeSlider = component$(({min, max, onChange, minValue, maxValue}: MultiRangeSliderProps) => {
    const range = useSignal<HTMLDivElement>();

    // Convert to percentage
    const getPercent = $((value: number) => {
        return Math.round(((value - min) / (max - min)) * 100)
    });

    // Set width of the range to decrease from the left side
    useVisibleTask$(async ({track}) => {
        track(() => minValue.value)

        const minPercent = await getPercent(minValue.value);
        const maxPercent = await getPercent(maxValue.value);

        if (range.value) {
            range.value.style.left = `${minPercent}%`;
            range.value.style.width = `${maxPercent - minPercent}%`;
        }
    });

    // Set width of the range to decrease from the right side
    useVisibleTask$(async ({track}) => {
        track(() => maxValue.value)

        const minPercent = await getPercent(minValue.value);
        const maxPercent = await getPercent(maxValue.value);

        if (range.value) {
            range.value.style.width = `${maxPercent - minPercent}%`;
        }
    });

    // Get min and max values when their state changes
    useTask$(async ({track}) => {
        track(() => minValue.value)
        track(() => maxValue.value)

        if (isBrowser) await onChange({min: minValue.value, max: maxValue.value});
    });

    return (
        <div class="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minValue.value}
                onInput$={(event, element) => {
                    minValue.value = Math.min(Number((event.target as HTMLInputElement).value), maxValue.value - 1);
                    element.value = String(minValue.value)
                }}
                class="thumb thumb--left"
            />

            <input
                type="range"
                min={min}
                max={max}
                value={maxValue.value}
                onInput$={(event, element) => {
                    maxValue.value = Math.max(Number((event.target as HTMLInputElement).value), minValue.value + 1);
                    element.value = String(maxValue.value)
                }}
                class="thumb thumb--right"
            />

            <div class="slider" onClick$={(event, element) => {
                const {x, width} = element.getBoundingClientRect()

                const relativeX = event.x - x

                if (relativeX > width) return

                const value = Math.round((relativeX / width) * (max - min) + min)

                if (relativeX < width / 2) {
                    //right side
                    minValue.value = value
                } else {
                    maxValue.value = value
                }
            }}>
                <div class="slider__track"/>
                <div ref={range} class="slider__range"/>
                <div class="slider__left-value">{minValue.value}</div>
                <div class="slider__right-value">{maxValue.value}</div>
            </div>
        </div>
    );
})

