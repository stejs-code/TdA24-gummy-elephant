import {component$, Signal} from "@builder.io/qwik";
import {Change, ChangeMobile} from "~/components/reservations/change";
import {PrimaryButton} from "~/components/ui/button";

interface Props {
    type:string
}

export const ReservationsHeader =  component$(({type}:Props) => {

    return(
        <header class="flex flex-none items-center justify-between  border-gray-200 px-6 py-4 border rounded-t-md bg-gray-100">
            <div>
                <h1 class="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime="2022-01-22" class="sm:hidden">Jan 22, 2022</time>
                    <time dateTime="2022-01-22" class="hidden sm:inline">January 22, 2022</time>
                </h1>
                <p class="mt-1 text-sm text-gray-500">Saturday</p>
            </div>
            <div class="flex items-center">
                <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                    <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                        <span class="sr-only">Previous day</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>
                    <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                    <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                        <span class="sr-only">Next day</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="hidden md:ml-4 md:flex md:items-center">
                    <Change type={type}/>
                    <div class="ml-3 mr-3 h-6 w-px bg-gray-300"></div>
                    <PrimaryButton>
                        Exportovat
                    </PrimaryButton>
                </div>
                <ChangeMobile/>
            </div>
        </header>
    )
})