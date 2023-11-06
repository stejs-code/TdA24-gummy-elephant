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
            <div class="w-3/4 p-4">
    <h1 class="text-3xl font-Lalezar text-black text-3xl font-medium">Mgr. Petra Swil Plachá MBA</h1>
    <h4 class="text-sm text-gray-600 font-Open Sans">Aktivní studentka / Předsedkyně spolku</h4>
    <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-FEC93E font-Open Sans font-semibold">+420 722 482 974</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-FEC93E font-Open Sans font-semibold">placha@scg.cz</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-FEC93E font-Open Sans font-semibold">predseda@scg.cz</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-black font-Open Sans font-semibold">Brno</p>
        </div>
        <div class="flex items-center">
            <div class="w-6 h-6 bg-gray-400 mr-2"></div>
            <p class="text-black font-Open Sans font-semibold">1200 Kč/h</p>
        </div>
    </div>
    <div class="p-4">
        <p class="text-Open Sans text-base text-justify">Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, Tour de App a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>
    </div>
    <div class="p-4">
        <div class="space-x-2">
            <span class="text-72C7D3 bg-white px-2 py-1 rounded-full text-Open Sans font-semibold text-xs">Fundraising pro neziskové studentské projekty</span>
            <span class="text-72C7D3 bg-white px-2 py-1 rounded-full text-Open Sans font-semibold text-xs">Projektový management, event management</span>
            <span class="text-72C7D3 bg-white px-2 py-1 rounded-full text-Open Sans font-semibold text-xs">Mimoškolní aktivity</span>
            <span class="text-72C7D3 bg-white px-2 py-1 rounded-full text-Open Sans font-semibold text-xs">Fundraising pro neziskové studentské projekty</span>
            <span class="text-72C7D3 bg-white px-2 py-1 rounded-full text-Open Sans font-semibold text-xs">Projektový management, event management</span>
        </div>
    </div>
</div>

        </>
    );
});

export const head: DocumentHead = {
    title: "Hello TdA",
};
