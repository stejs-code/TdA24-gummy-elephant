import {component$, Slot} from "@builder.io/qwik";
import {IconParkElephant} from "~/components/icons/elephant";
import {Image} from "@unpic/qwik";
import {Link} from "@builder.io/qwik-city";

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
