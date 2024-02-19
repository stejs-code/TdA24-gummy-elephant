import {component$} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {LuChevronLeft, LuChevronRight} from "@qwikest/icons/lucide";
import {Table} from "~/components/reservations/table";

export default component$(() => {
    const workDays = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
    return(
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
            <div class={"flex gap-6 justify-center "}>
                {
                    workDays.map((day, index) => (

                        <Table key={index} day={day} isCurrentDay={(new Date()).getDay() == index+1}/>
                    ))
                }
                
            </div>

        </div>
    )
})
