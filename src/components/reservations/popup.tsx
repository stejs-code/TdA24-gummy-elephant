import {component$, Signal, useSignal} from "@builder.io/qwik";
import {LuChevronLeft, LuChevronRight, LuX} from "@qwikest/icons/lucide";
import {PrimaryButton} from "~/components/ui/button";
import {Modal} from "@qwik-ui/headless";

interface Props {
    name:string,
    surname:string,
    mail:string,
    phone:number,
    date:number,
    time:number,
    comment:string,
    modalVisible: Signal<boolean>
}

export const Popup =  component$((props:Props) => {

    const modalVisible = props.modalVisible

    return(
        <Modal bind:show={modalVisible}
               class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full md:max-w-[60rem] rounded-l-md border-0 bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

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
                        <input type="text" value={"Marie"} disabled={true} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full"}/>
                    </div>
                    <div class={"w-1/2"}>
                        <p class={"mb-1"}>Příjmení:</p>
                        <input type="text" value={"Juchalkova"} disabled={true}  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full"}/>
                    </div>
                </div>
                <div class={"mb-5"}>
                    <p class={"mb-1"}>E-mail:</p>
                    <input type="email" value={"juchelkova@scg.cz"} disabled={true}  class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full"}/>
                </div>
                <div class={"flex items-center gap-5 mb-5"}>
                    <div class={"w-1/2"}>
                        <p class={"mb-1"}>Telefon:</p>
                        <input type="tel" value={"+420 733 333 233"} disabled={true} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full "}/>
                    </div>
                    <div class={"w-1/2"}>
                        <p class={"mb-1"}>Vybraný Tag:</p>
                        <select id={"time"} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full "} disabled={true}>
                            <option value="BDSM">Javascript - mentoring</option>
                            <option value="BDSM">BDSM</option>
                        </select>
                    </div>
                </div>
                <div class={"flex items-center gap-5 mb-5"}>
                    <div class={"w-1/2"}>
                        <p class={"mb-1"}>Datum:</p>
                        <input type="date" value={"Jana"} disabled={false} class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full cursor-pointer"}/>
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
                    <PrimaryButton type="submit" class={"flex-shrink-0 w-sm"}>
                            <span class={"inline"}
                                  onClick$={() => {
                                      modalVisible.value = false
                                  }}
                            >Uložit</span>
                    </PrimaryButton>
                </div>
            </div>

        </Modal>
    )
})