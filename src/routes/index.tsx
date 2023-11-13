import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {Link} from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <>
            <div class={"w-full max-w-5xl m-auto"}>
                <h1 class={"text-4xl font-display"}>Hello TdA</h1>

                <Link href={"/lecturer"} class={"underline"}>
                    Lecturer
                </Link>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Hello TdA",
};
