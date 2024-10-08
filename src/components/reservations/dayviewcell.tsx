import type {QRL} from "@builder.io/qwik";
import {component$, Slot} from "@builder.io/qwik";
import {cn} from "~/app/utils";

interface Props {
    classus?: string,
    notcurrentmonth?: boolean,
    ifevent?: boolean,
    selected?: boolean,
    today?: boolean,
    date?: string,
    onClick$?: QRL<() => void>
}

export const DayViewCell = component$((props: Props) => {
    return (
        <button
            onClick$={() => props.onClick$ && props.onClick$()}
            type="button"
            class={cn(
                "bg-white py-1.5 text-gray-900 hover:bg-gray-50 focus:z-10",
                props.classus,
                props.ifevent && "bg-primary-100 hover:bg-primary-50",
                props.notcurrentmonth && "bg-gray-100",
            )}
        >
            <time dateTime="2022-01-21" class={cn(
                "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                props.selected && "bg-gray-200 shadow text-white",
                props.today && "bg-primary-200 text-white font-bold",
                props.today && props.selected && "bg-primary-300 text-white font-bold",
            )}>
                <Slot/>
            </time>
            <span class="sr-only">1 event</span>
        </button>
    )
})