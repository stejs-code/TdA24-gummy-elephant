import {component$, useSignal} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {LuChevronLeft, LuChevronRight, LuX} from "@qwikest/icons/lucide";
import {Table} from "~/components/reservations/table";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {PrimaryButton} from "~/components/ui/button";

export default component$(() => {

    const modalVisible = useSignal(false)

    const workDays = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
    return(
        <>
            <Modal bind:show={modalVisible}
                class={"sheet shadow-dark-medium overflow-y-hidden max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-[60rem] rounded-l-md border-0 bg-white p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

                <div class={"px-6 py-2.5"}>
                    <div class={"flex items-center justify-between mb-6"}>
                        <h2 class={"text-2xl font-bold"}>Rezervace 16 - 19</h2>
                        <div class="p-1 cursor-pointer"
                             onClick$={() => {
                                 modalVisible.value = false
                             }}><LuX/></div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div>
                            <p class={"mb-1"}>Jméno:</p>
                            <input type="text" value={"Marie"} disabled={true} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white"}/>
                        </div>
                        <div>
                            <p class={"mb-1"}>Příjmení:</p>
                            <input type="text" value={"Juchalkova"} disabled={true}  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white"}/>
                        </div>
                    </div>
                    <div class={"mb-5"}>
                        <p class={"mb-1"}>E-mail:</p>
                        <input type="email" value={"juchelkova@scg.cz"} disabled={true}  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full"}/>
                    </div>
                    <div class={"mb-5"}>
                        <p class={"mb-1"}>Telelefon:</p>
                        <input type="tel" value={"+420 696 969 996"} disabled={true}  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full"}/>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Datum:</p>
                            <input type="date" value={"Jana"} disabled={false} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Čas:</p>
                            <select id={"time"} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full cursor-pointer"}>
                                <option value="16-19">16-19</option>
                                <option value="9-10">9-10</option>
                            </select>
                        </div>
                    </div>
                    <div class={"mb-5"}>
                        <p class={"mb-1"}>Poznámka:</p>
                        <textarea name="note" id="note" cols={50} rows={6} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full resize-none text-sm"} value={"Prosím tě, dopřej mi radost z chutného pokrmu, který mi zahřeje srdce a okoření můj den. Tvá kulinářská kouzla mi přinesou nejen fyzickou sytost, ale i kulturní dobrodružství prostřednictvím vůně a chuťových zážitků. Děkuji ti za každý laskavý okamžik sdílený skrze výtečné jídlo."}></textarea>
                    </div>
                    <div>
                        <PrimaryButton type="submit" class={"flex-shrink-0 w-sm cursor-pointer"}>
                            <span class={"hidden sm:inline"}
                            onClick$={() => {
                                modalVisible.value = false
                            }}
                            >Uložit</span>
                        </PrimaryButton>
                    </div>
                </div>

            </Modal>
            <div class={"w-full max-w-5xl m-auto px-4"}>
                <div class={"flex w-full justify-between items-center"}>
                    <div><h2 class={"text-3xl font-bold"}>Rezervace</h2></div>
                    <div class={"flex"}>
                        <Link href={"#"}>
                            <div class={"bg-primary-200 text-primary-400 mr-2 rounded-xl px-2 py-2 cursor-pointer hover:scale-125 duration-150"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-properties "><path d="M15 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/></svg></div>
                        </Link>
                        <Link href={"./table"}>
                            <div class={"px-2 py-2 cursor-pointer hover:scale-125 duration-150"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-panel-top "><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
                            </div>
                        </Link>
                    </div>
                </div>
                <div class={"mt-3 mb-12"}>
                    <div class={"flex items-center -ml-1"}>
                        <LuChevronLeft class={"text-primary-300 text-2xl"}/>
                        <p>Týden 21.4. - 25. 4. 1969</p>
                        <LuChevronRight class={"text-primary-300 text-2xl"}/>
                    </div>
                </div>
                <div class={"flex gap-6 justify-start lg:justify-center overflow-x-scroll overflow-y-hidden py-10"}>
                    {
                        workDays.map((day, index) => (

                            <Table key={index} closeModal={modalVisible} day={day} isCurrentDay={(new Date()).getDay() == index+1}/>
                        ))
                    }
                </div>

            </div>
        </>
    )
})