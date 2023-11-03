import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {DotGrid} from "~/components/DotGrid/dotgrid";

export default component$(() => {
    return (
        <>
            <div class={"w-full max-w-2xl mx-auto"}>
                <h1>Testik</h1>

                <DotGrid amount={20} size={280} radius={2} fill={"#74C7D3"}/>
            </div>

        </>
    );
});

export const head: DocumentHead = {
    title: "Hello TdA",
};
