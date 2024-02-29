import type {Signal} from "@builder.io/qwik";
import {component$} from "@builder.io/qwik";
import {cn} from "~/app/utils";

interface Props {
    classus?:string,
    notcurrentmonth?:true,
    ifevent?:true,
    today?:true,
    date?:string
}

export const DayViewCell = component$((props: Props) => {


    let bigclass:string = ""

    if (props.ifevent) {bigclass = bigclass + " bg-primary-100"}
    if(props.notcurrentmonth) {bigclass = bigclass + " bg-gray-100"}

    return(
        <button type="button" class={cn("bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10", props.classus, bigclass)}>
            {/*//Is selected and is today, include: "bg-secondary-500"
                // Is selected and is not today, include: "bg-gray-900" */}
            <time dateTime="2022-01-21" class={`${props.today? "bg-secondary-500 shadow text-white" : ""} mx-auto flex h-7 w-7 items-center justify-center rounded-full `}>13</time>
            <span class="sr-only">1 event</span>
        </button>
    )

})