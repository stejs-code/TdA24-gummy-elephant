import {component$} from "@builder.io/qwik";
import {ReservationsHeader} from "~/components/reservations/reservationsHeader";


export default component$(() => {

    return(
        <div class={"px-4"}>
            <div class="flex h-full flex-col">
                <ReservationsHeader type={"Denní"}/>
                <div class="isolate flex flex-auto overflow-hidden bg-white h-[100vh] md:h-[80vh] border border-gray-200 border-t-0 rounded-b-md">
                    <div class="flex flex-auto flex-col overflow-y-scroll">
                        <div class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden">
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>W</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">19</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>T</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-indigo-600">20</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>F</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">21</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>S</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">22</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>S</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">23</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>M</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">24</span>
                            </button>
                            <button type="button" class="flex flex-col items-center pb-1.5 pt-3">
                                <span>T</span>
                                <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">25</span>
                            </button>
                        </div>
                        <div class="flex w-full flex-auto">
                            <div class="w-14 flex-none bg-white ring-1 ring-gray-100"></div>
                            <div class="grid flex-auto grid-cols-1 grid-rows-1">
                                <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))">
                                    <div class="h-7"></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11AM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">1PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">2PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">3PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">4PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">5PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">6PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">7PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10PM</div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11PM</div>
                                    </div>
                                    <div></div>
                                </div>

                                <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
                                    <li class="relative mt-px flex" style="grid-row: 74 / span 12">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                                            <p class="order-1 font-semibold text-blue-700">Breakfast</p>
                                            <p class="text-blue-500 group-hover:text-blue-700"><time dateTime="2022-01-22T06:00">6:00 AM</time></p>
                                        </a>
                                    </li>
                                    <li class="relative mt-px flex" style="grid-row: 92 / span 30">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                                            <p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
                                            <p class="order-1 text-pink-500 group-hover:text-pink-700">John F. Kennedy International Airport</p>
                                            <p class="text-pink-500 group-hover:text-pink-700"><time dateTime="2022-01-22T07:30">7:30 AM</time></p>
                                        </a>
                                    </li>
                                    <li class="relative mt-px flex" style="grid-row: 134 / span 18">
                                        <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100">
                                            <p class="order-1 font-semibold text-indigo-700">Sightseeing</p>
                                            <p class="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
                                            <p class="text-indigo-500 group-hover:text-indigo-700"><time dateTime="2022-01-22T11:00">11:00 AM</time></p>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                        <div class="flex items-center text-center text-gray-900">
                            <button type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Previous month</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <div class="flex-auto text-sm font-semibold">January 2022</div>
                            <button type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Next month</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                            <div>S</div>
                        </div>
                        <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">

                            <button type="button" class="rounded-tl-lg bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">

                                <time dateTime="2021-12-27" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">27</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-28" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">28</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-29" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">29</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-30" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">30</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-31" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">31</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-01" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">1</time>
                            </button>
                            <button type="button" class="rounded-tr-lg bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-02" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">2</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-03" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">3</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-04" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">4</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-05" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">5</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-06" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">6</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-07" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">7</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-08" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">8</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-09" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">9</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-10" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">10</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-11" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">11</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-12" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">12</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-13" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">13</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-14" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">14</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-15" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">15</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-16" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">16</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-17" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">17</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-18" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">18</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-19" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">19</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-20" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">20</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-21" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">21</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-22" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">22</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-23" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">23</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-24" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">24</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-25" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">25</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-26" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">26</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-27" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">27</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-28" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">28</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-29" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">29</time>
                            </button>
                            <button type="button" class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-30" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">30</time>
                            </button>
                            <button type="button" class="rounded-bl-lg bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-31" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">31</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-01" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">1</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-02" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">2</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-03" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">3</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-04" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">4</time>
                            </button>
                            <button type="button" class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-05" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">5</time>
                            </button>
                            <button type="button" class="rounded-br-lg bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-06" class="mx-auto flex h-7 w-7 items-center justify-center rounded-full">6</time>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})