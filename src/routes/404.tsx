import {component$} from "@builder.io/qwik";
import {PrimaryButtonLink} from "~/components/ui/button";

export default component$(() => {
    return <>
        <div class={"w-full max-w-4xl m-auto px-4 mt-4"}>
            <h1 class={"text-6xl sm:text-6xl font-display mb-0"}>Stránka nenalezena</h1>
            <h2 class={"text-lg mb-6 text-slate-400"}>Chyba 404</h2>
            <p class={"mb-8 text-lg"}>Vámi hledaná stránka již neexistuje. </p>
            <PrimaryButtonLink href={"/"}>
                Zpět
            </PrimaryButtonLink>
        </div>
    </>
})