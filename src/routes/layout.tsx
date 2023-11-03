import {component$, Slot} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import Logo from '~/media/logo.svg?jsx';

export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    return <>
        <nav class={"p-10 md:fixed w-full bg-white md:bg-transparent"}>
            <Logo
                style={{width: '80px'}}
                class={"md:bg-white"}
            />
        </nav>
        <div class={"md:pb-32"}></div>

        <Slot/>

        <footer class={"text-slate-300 px-4 py-4 text-center md:px-6 md:bottom-0 md:right-0 md:fixed"}>
            Made by <i>gummy elephant</i> team.
        </footer>
    </>;
});
