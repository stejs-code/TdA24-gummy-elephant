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
        </>
    );
});

export const head: DocumentHead = {
    title: "Hello TdA",
};
