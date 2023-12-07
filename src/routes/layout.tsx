import {component$, Slot} from "@builder.io/qwik";
import {IconParkElephant} from "~/components/icons/elephant";
import {Image} from "@unpic/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import {Link} from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl, request }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });

    const apiUrl = 'https://heavenlyscornfulstrings.e45g.repl.co/';

    const postData = {
        r: request.toString()
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })


};

export default component$(() => {
    return <>
        <nav class={"p-8 w-full flex"}>
            <Link href={"/"} prefetch={true}>
                <Image
                    class={"pointer-events-none"}
                    src={"/images/logo.svg"}
                    width={80}
                    height={53}
                    alt={"Teacher Digital Agency Logo"}
                />
            </Link>
        </nav>

        <Slot/>

        <footer
            class={"text-slate-300 flex justify-center py-4 2xl:justify-end px-6 mt-8 2xl:fixed 2xl:right-0 2xl:bottom-0"}>
            {/*Made by <IconParkElephant style={{display: "inline", fontSize: 24, transform: "translateY(-2px)"}} color={"#cbd5e1"}/> gummy elephant team.*/}
            <a href="https://github.com/stejs-code/TdA24-gummy-elephant"
               aria-label={"github repository of this site"}
               class={"block hover:scale-110 hover:-rotate-12 transition-all"}>
                <IconParkElephant
                    style={{display: "inline", fontSize: 24, transform: "translateY(-2px)"}}
                    color={"#cbd5e1"}/>
            </a>
        </footer>
    </>;
});
