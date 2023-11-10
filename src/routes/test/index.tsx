import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";

export default component$(() => {
    return (
        <>
            <div class={"w-full max-w-2xl mx-auto"}>
                <Profile
                    imageUrl={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}
                    alt={"Mgr. Petra Swil Plachá MBA"}/>

            </div>
            <div class="flex flex-col items-start px-100">
    <div class="p-4">
    <h1 class="text-blackCustom text-4xl not-italic font-normal">Mgr. Petra Swil Plachá MBA</h1>
    <h4 class="text-blackCustom mt-2 text-base not-italic font-normal">Aktivní studentka / Předsedkyně spolku</h4>
    </div>
    <div class="mt-12 flex justify-between max-w-sm">
        <div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div> {/*ICONS-not added yet*/}
            <p class="text-yellowCustom text-base not-italic font-semibold">+420 722 482 974</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-yellowCustom text-base not-italic font-semibold">placha@scg.cz</p>
            <p class="text-yellowCustom text-base not-italic font-semibold">predseda@scg.cz</p>
        </div>
        </div>
        <div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-yellowCustom text-base not-italic font-semibold">Brno</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-yellowCustom text-base not-italic font-semibold">1200 Kč/h</p>
        </div>
        </div>
    </div>
    <div class="p-4">
        <p class="mt-12 text-blackCustom text-justify text-sm not-italic font-normal">Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, Tour de App a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>
    </div>
    <div class="p-4">
        <div class="mt-12 flex flex-wrap">
            <span class="mr-2 mb-1 text-teal-300 text-center text-xs not-italic font-semibold rounded-md border border-solid border-blueCustom py-1.5 px-2.5">Fundraising pro neziskové studentské projekty</span>
            <span class="mr-2 mb-1 text-teal-300 text-center text-xs not-italic font-semibold rounded-md border border-solid border-blueCustom py-1.5 px-2.5">Fundraising pro neziskové studentské projekty</span>
            <span class="mr-2 mb-1 text-teal-300 text-center text-xs not-italic font-semibold rounded-md border border-solid border-blueCustom py-1.5 px-2.5">Fundraising pro neziskové studentské projekty</span>
            <span class="mr-2 mb-1 text-teal-300 text-center text-xs not-italic font-semibold rounded-md border border-solid border-blueCustom py-1.5 px-2.5">Fundraising pro neziskové studentské projekty</span>

        </div>
    </div>
</div>

        </>
    );
});

export const head: DocumentHead = {
    title: "Hello TdA",
};
