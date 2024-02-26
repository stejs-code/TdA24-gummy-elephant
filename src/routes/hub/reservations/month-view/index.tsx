import {component$, useSignal} from "@builder.io/qwik";
import {ChangeView} from "~/components/reservations/changeView";
import {PrimaryButton} from "~/components/ui/button";
import {Change, ChangeMobile} from "~/components/reservations/change";

export default component$(() => {


    return (
        <div class={"px-4 "}>
            <div class={"font-bold text-3xl px-3"}>
                <h2>Rezervace</h2>
            </div>
            <div class="lg:flex lg:h-full lg:flex-col">
                <header class="flex items-center justify-between border-b border-gray-200 px-3 py-4 lg:flex-none">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">
                        <time dateTime="2022-01">Únor 2023</time>
                    </h1>
                    <div class="flex items-center">
                        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                            <button type="button"
                                    class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                                <span class="sr-only">Minulý měsíc</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <button type="button"
                                    class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Dnes
                            </button>
                            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                            <button type="button"
                                    class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                                <span class="sr-only">Další měsíc</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                          clip-rule="evenodd"/>
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
                <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                    <div
                        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                        <div class="flex justify-center bg-white py-2">
                            <span>Po</span>
                            <span class="sr-only sm:not-sr-only">ndělí</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Út</span>
                            <span class="sr-only sm:not-sr-only">erý</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>St</span>
                            <span class="sr-only sm:not-sr-only">ředa</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Čt</span>
                            <span class="sr-only sm:not-sr-only">vrtek</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Pát</span>
                            <span class="sr-only sm:not-sr-only">ek</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Sob</span>
                            <span class="sr-only sm:not-sr-only">ota</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Neď</span>
                            <span class="sr-only sm:not-sr-only">ele</span>
                        </div>
                    </div>
                    <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">

                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">

                                <time dateTime="2021-12-27">27</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2021-12-28">28</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2021-12-29">29</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2021-12-30">30</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2021-12-31">31</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-01">1</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-01">2</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-03">3</time>
                                <ol class="mt-2">
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Design
                                                review</p>
                                            <time dateTime="2022-01-03T10:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">10AM
                                            </time>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sales
                                                meeting</p>
                                            <time dateTime="2022-01-03T14:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM
                                            </time>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-04">4</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-05">5</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-06">6</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-07">7</time>
                                <ol class="mt-2">
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Date
                                                night</p>
                                            <time dateTime="2022-01-08T18:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">6PM
                                            </time>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-08">8</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-09">9</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-10">10</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-11">11</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-12"
                                      class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12
                                </time>
                                <ol class="mt-2">
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sam's
                                                birthday party</p>
                                            <time dateTime="2022-01-25T14:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM
                                            </time>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-13">13</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-14">14</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-15">15</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-16">16</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-17">17</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-18">18</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-19">19</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-20">20</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-21">21</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-22">22</time>
                                <ol class="mt-2">
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Maple
                                                syrup museum</p>
                                            <time dateTime="2022-01-22T15:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">3PM
                                            </time>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Hockey
                                                game</p>
                                            <time dateTime="2022-01-22T19:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">7PM
                                            </time>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-23">23</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-24">24</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-25">25</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-26">26</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-27">27</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-28">28</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-29">29</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-30">30</time>
                            </div>
                            <div class="relative bg-white px-3 py-2">
                                <time dateTime="2022-01-31">31</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-01">1</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-02">2</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-03">3</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-04">4</time>
                                <ol class="mt-2">
                                    <li>
                                        <a href="#" class="group flex">
                                            <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Cinema
                                                with friends</p>
                                            <time dateTime="2022-02-04T21:00"
                                                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">9PM
                                            </time>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-05">5</time>
                            </div>
                            <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                                <time dateTime="2022-02-06">6</time>
                            </div>
                        </div>
                        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">

                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">

                                <time dateTime="2021-12-27" class="ml-auto">27</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-28" class="ml-auto">28</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-29" class="ml-auto">29</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-30" class="ml-auto">30</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2021-12-31" class="ml-auto">31</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-01" class="ml-auto">1</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-02" class="ml-auto">2</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-03" class="ml-auto">3</time>
                                <span class="sr-only">2 events</span>
                                <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-04" class="ml-auto">4</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-05" class="ml-auto">5</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-06" class="ml-auto">6</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-07" class="ml-auto">7</time>
                                <span class="sr-only">1 event</span>
                                <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-08" class="ml-auto">8</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-09" class="ml-auto">9</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-10" class="ml-auto">10</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-11" class="ml-auto">11</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-12" class="ml-auto">12</time>
                                <span class="sr-only">1 event</span>
                                <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-13" class="ml-auto">13</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-14" class="ml-auto">14</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-15" class="ml-auto">15</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-16" class="ml-auto">16</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-17" class="ml-auto">17</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-18" class="ml-auto">18</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-19" class="ml-auto">19</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-20" class="ml-auto">20</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-21" class="ml-auto">21</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-22"
                                      class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900">22
                                </time>
                                <span class="sr-only">2 events</span>
                                <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-23" class="ml-auto">23</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-24" class="ml-auto">24</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-25" class="ml-auto">25</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-26" class="ml-auto">26</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-27" class="ml-auto">27</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-28" class="ml-auto">28</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-29" class="ml-auto">29</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-30" class="ml-auto">30</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-01-31" class="ml-auto">31</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-01" class="ml-auto">1</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-02" class="ml-auto">2</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-03" class="ml-auto">3</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-04" class="ml-auto">4</time>
                                <span class="sr-only">1 event</span>
                                <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-05" class="ml-auto">5</time>
                                <span class="sr-only">0 events</span>
                            </button>
                            <button type="button"
                                    class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
                                <time dateTime="2022-02-06" class="ml-auto">6</time>
                                <span class="sr-only">0 events</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
})