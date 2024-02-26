import {component$, useSignal} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {Change, ChangeMobile} from "~/components/reservations/change";

export default component$(() => {


    return(
        <div class={"px-4"}>
            <div class="flex h-full flex-col">
                <header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">
                        <time dateTime="2022-01">January 2022</time>
                    </h1>
                    <div class="flex items-center">
                        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                            <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                                <span class="sr-only">Previous week</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>
                            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                            <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                                <span class="sr-only">Next week</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div class="hidden md:ml-4 md:flex md:items-center">
                            <Change/>
                            <div class="ml-3 mr-3 h-6 w-px bg-gray-300"></div>
                            <PrimaryButton>
                                Exportovat
                            </PrimaryButton>
                        </div>
                        <div class="relative ml-6 md:hidden">
                            <ChangeMobile/>
                        </div>
                    </div>
                </header>
                <div class="isolate flex flex-auto flex-col overflow-auto bg-white border border-t-0 border-b-0">
                    <div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                        <div class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 ">
                            <div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">M <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">T <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">W <span class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">T <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">F <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">S <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span></button>
                                <button type="button" class="flex flex-col items-center pb-3 pt-2">S <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span></button>
                            </div>

                            <div class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                                <div class="col-end-1 w-14"></div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Mon <span class="items-center justify-center font-semibold text-gray-900">10</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Tue <span class="items-center justify-center font-semibold text-gray-900">11</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span class="flex items-baseline">Wed <span class="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Thu <span class="items-center justify-center font-semibold text-gray-900">13</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Fri <span class="items-center justify-center font-semibold text-gray-900">14</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Sat <span class="items-center justify-center font-semibold text-gray-900">15</span></span>
                                </div>
                                <div class="flex items-center justify-center py-3">
                                    <span>Sun <span class="items-center justify-center font-semibold text-gray-900">16</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-auto">
                            <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 border-b border-gray-100"></div>
                            <div class="grid flex-auto grid-cols-1 grid-rows-1">
                                <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
                                    <div class="h-7"></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11PM</div>
                                    </div>
                                    <div></div>
                                </div>

                                <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                                    <div class="col-start-1 row-span-full"></div>
                                    <div class="col-start-2 row-span-full"></div>
                                    <div class="col-start-3 row-span-full"></div>
                                    <div class="col-start-4 row-span-full"></div>
                                    <div class="col-start-5 row-span-full"></div>
                                    <div class="col-start-6 row-span-full"></div>
                                    <div class="col-start-7 row-span-full"></div>

                                </div>
                                {/* eventy provizorni */}
                                <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                                    <li class="relative mt-px flex sm:col-start-3" style="grid-row: 74 / span 12">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                                            <p class="order-1 font-semibold text-blue-700">Breakfast</p>
                                            <p class="text-blue-500 group-hover:text-blue-700"><time dateTime="2022-01-12T06:00">6:00 AM</time></p>
                                        </a>
                                    </li>
                                    <li class="relative mt-px flex sm:col-start-3" style="grid-row: 92 / span 30">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                                            <p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
                                            <p class="text-pink-500 group-hover:text-pink-700"><time dateTime="2022-01-12T07:30">7:30 AM</time></p>
                                        </a>
                                    </li>
                                    <li class="relative mt-px hidden sm:col-start-6 sm:flex" style="grid-row: 122 / span 24">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200">
                                            <p class="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                                            <p class="text-gray-500 group-hover:text-gray-700"><time dateTime="2022-01-15T10:00">10:00 AM</time></p>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})