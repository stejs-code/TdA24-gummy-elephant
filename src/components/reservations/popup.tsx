import type {PropsOf, Signal} from "@builder.io/qwik";
import {$, component$, useSignal} from "@builder.io/qwik";
import {LuArrowBigLeft, LuX} from "@qwikest/icons/lucide";
import {PrimaryButton} from "~/components/ui/button";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {MultiRangeSlider} from "~/components/ui/multiRange";
import {ArrowLeft} from "lucide-react";


interface Props {
    name: string,
    surname: string,
    mail: string,
    phone: number,
    date: number,
    time: number,
    comment: string,
    modalVisible: Signal<boolean>
}





export const Popup = component$((props: Props) => {

    const popUpVisible = useSignal(false)
    const modalVisible = props.modalVisible

    return (
        <>
            <Modal bind:show={modalVisible}
                   class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full md:w-[40vw] rounded-l-md border-0 bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

                <div class={"px-3 pt-3 sm:px-6 sm:py-2.5"}>
                    <div class={"flex items-center justify-between mb-6"}>
                        <h2 class={"text-2xl font-bold"}>Rezervace 16 - 19</h2>
                        <div class="p-1 cursor-pointer"
                             onClick$={() => {
                                 modalVisible.value = false
                             }}><LuX/></div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Jméno:</p>
                            <input type="text" value={"Marie"} disabled={true}
                                   class={"bg-gray-50 px-3 py-1.5 border rounded-lg border-gray-300 w-full"}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Příjmení:</p>
                            <input type="text" value={"Juchalkova"} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full"}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Email:</p>
                            <input type="email" value={"juchalkova@nevim.ai"} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Telefon:</p>
                            <input type="tel" value={"+420 782 278 990"} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Tag:</p>
                            <input type="text" value={"BDSM"} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Způsob setkání:</p>
                            <input type="text" value={"Offline"} disabled={true}
                                   className={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Datum:</p>
                            <input type="date" value={new Date().toString()} disabled={false}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full cursor-pointer"}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p>Multi range slider HERE</p>
                        </div>
                    </div>
                    <div class={"mb-5"}>
                        <p class={"mb-1"}>Poznámka:</p>
                        <textarea name="note" id="note" cols={50} rows={6}
                                  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full resize-none text-sm"}
                                  value={"Prosím tě, dopřej mi radost z chutného pokrmu, který mi zahřeje srdce a okoření můj den. Tvá kulinářská kouzla mi přinesou nejen fyzickou sytost, ale i kulturní dobrodružství prostřednictvím vůně a chuťových zážitků. Děkuji ti za každý laskavý okamžik sdílený skrze výtečné jídlo."}></textarea>
                    </div>
                    <div class={"w-full flex justify-between"}>
                        <PrimaryButton type="submit" class={"flex-shrink-0 w-sm"} onClick$={() => {
                            modalVisible.value = false
                        }}>
                            <span class={"inline"}

                            >Uložit</span>
                        </PrimaryButton>

                        <PrimaryButton type="submit" class={"flex-shrink-0 w-sm bg-red-500 hover:bg-red-600 active:bg-red-600 focus:bg-red-500"} onClick$={() => {
                            popUpVisible.value = true
                        }}>
                            <span class={"inline"}

                            >Zrušit Schůzku</span>
                        </PrimaryButton>
                    </div>
                </div>


            </Modal>

            <Modal
                alert
                bind:show={popUpVisible}
                class="rounded-md rounded-base max-w-[25rem] p-[28px] shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
            >
                <ModalHeader>
                    <h2 class="mb-2 text-lg font-bold ">Zrušit schůzku</h2>
                </ModalHeader>
                <ModalContent class="mb-2 pb-4 pt-2">
                    <p class="leading-5">Opravdu si přejete zrušit schůzku?</p>
                </ModalContent>
                <ModalFooter class="flex justify-end gap-4">
                    <button
                        class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-base border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
                    >
                        <span class={"flex items-center"}>
                            <LuArrowBigLeft/>
                            <p>Zpět</p>
                        </span>
                    </button>
                    <button
                        class="text-red-500 bg-destructive focus:ring-destructive text-destructive-foreground focus-visible:destructive-foreground/90 rounded-base border border-none px-4 py-[10px] outline-none focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
                    >
                        Zrušit schůzku
                    </button>
                </ModalFooter>
                <button
                    onClick$={() => (popUpVisible.value = false)}
                    class="absolute right-6 top-[26px]"
                >
                    <div class="p-1 cursor-pointer"
                         onClick$={() => {
                             modalVisible.value = false
                         }}><LuX/></div>
                </button>
            </Modal>
        </>


    )
})

