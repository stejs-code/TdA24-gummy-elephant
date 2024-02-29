import {component$, useSignal} from "@builder.io/qwik";
import {ChangeView} from "~/components/reservations/changeView";
import {PrimaryButton} from "~/components/ui/button";

interface Props {
    type: string
}

export const Change = component$(({type}: Props) => {

    const buttonshow = useSignal(false)

    return (
        <div class="relative">
            <button type="button"
                    class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button" aria-expanded="false" aria-haspopup="true"
                    onClick$={() => {
                        buttonshow.value = !buttonshow.value
                    }}>
                {type}
                <svg class="-mr-1 h-5 w-5 text-gray-400"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"/>
                </svg>
            </button>

            <div
                class={`${buttonshow.value ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"} transition-opacity ease-in duration-75 absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}>
                <div class="py-1" role="none">
                    <ChangeView redirect={"./day-view"} content={"Denní"}/>
                    <ChangeView redirect={"./week-view"} content={"Týdenní"}/>
                    <ChangeView redirect={"./month-view"} content={"Měsíční"}/>
                </div>
            </div>

        </div>
    )
})

export const ChangeMobile = component$(() => {

    const buttonshow = useSignal(false)

    return (
        <div class="relative ml-6 md:hidden">
            <button type="button"
                    class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
                    id="menu-0-button" aria-expanded="false" aria-haspopup="true"
                    onClick$={() => {
                        buttonshow.value = !buttonshow.value
                    }}>

                <span class="sr-only">Open menu</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
                </svg>
            </button>

            <div
                class={`${buttonshow.value ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"} transition-opacity ease-in duration-75 absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu" aria-orientation="vertical" aria-labelledby="menu-0-button" tabIndex={-1}>
                <div class="py-2 flex justify-center items-center" role="none">
                    <PrimaryButton>
                        Exportovat
                    </PrimaryButton>
                </div>
                <div class="py-1" role="none">
                    <ChangeView redirect={"./day-view"} content={"Denní"}/>
                    <ChangeView redirect={"./week-view"} content={"Týdenní"}/>
                    <ChangeView redirect={"./month-view"} content={"Měsíční"}/>
                </div>
            </div>

        </div>
    )
})