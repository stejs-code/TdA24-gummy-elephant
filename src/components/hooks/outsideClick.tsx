import type {QRL, Signal} from "@builder.io/qwik";
import {$, useOnDocument} from "@builder.io/qwik";

/**
 * Hook that alerts clicks outside the passed ref
 */
export function useOutsideAlerter(ref: Signal<HTMLElement | undefined>, handler: QRL<() => void>) {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = $((event: MouseEvent) => {
        if (ref.value && event.target && !ref.value.contains(event.target as Node)) {
            handler()
        }
    })

    useOnDocument("mousedown", handleClickOutside)
}