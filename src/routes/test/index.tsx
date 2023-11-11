import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";
import {Info} from "~/components/lecturer/info";
import {LongInfo} from "~/components/lecturer/LongInfo";
import {Badge} from "~/components/lecturer/badge";

export default component$(() => {
    return (
        <>
            <div class={"sm:max-w-7xl sm:flex sm:justify-center sm:mx-auto"}>
                <div class={"w-full sm:mx-10"}>
                    <Profile
                        imageUrl={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}
                        alt={"Mgr. Petra Swil Plachá MBA"}/>

                </div>
                <div class="flex flex-col items-start mt-12 sm:mt-0">
                    <div class="px-4 sm:p-4">
                        <h1 class="text-blackCustom text-4xl not-italic font-bold">Mgr. Petra Swil Plachá MBA</h1>
                        <h4 class="text-blackCustom mt-4 text-xl not-italic font-normal">Aktivní studentka / Předsedkyně spolku</h4>
                    </div>
                    <div class="sm:mt-10 mt-5 flex sm:justify-between sm:max-w-sm flex-col-reverse sm:flex-row">
                        <div>
                            <Info
                                icon={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}
                                content={"+420 722 482 974"}/>

                            <LongInfo
                                icon={"#"}
                                content={'placha@scg.cz'}
                                secContent={'predseda@scg.cz'}/>

                        </div>
                        <div>
                            <Info
                                icon={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}
                                content={"Brno"}/>
                            <Info
                                icon={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}
                                content={"1200 Kč/h"}/>
                        </div>
                    </div>
                    <div class="p-4 pr-10">
                        <p class="sm:mt-10 mt-5 text-blackCustom text-justify text-s not-italic font-normal">Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, Tour de App a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>
                    </div>
                    <div class="p-4">
                        <div class="sm:mt-10 mt-5 flex flex-wrap content-center">
                            <Badge content={"Projektový management, event management"}/>
                            <Badge content={"Efektivní učení"}/>
                            <Badge content={"Projektový management, event management"}/>
                            <Badge content={"Mimoškolní aktivity"}/>
                            <Badge content={"Projektový management, event management"}/>
                            <Badge content={"Prezentační dovednosti"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "LecturerTest",
};
