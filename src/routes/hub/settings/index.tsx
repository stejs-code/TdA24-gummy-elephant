import {component$} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {type DocumentHead, Link} from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";

export default component$(() => {
    const session = useAuthSession();
    return (
        <>
            <div class={"mx-auto mt-20 w-full max-w-lg mb-5"}>
                <h2 class={"text-5xl sm:text-6xl font-display mb-1 sm:mb-2"}>{session.value?.user.first_name} {session.value?.user.middle_name} {session.value?.user.last_name}</h2>
                <h4 class={"font-medium text-lg sm:text-2xl mb-4 sm:mb-10"}>Lektor</h4>
                <Link class={"mb-6 block"} href={"./changepassword"}>
                    <PrimaryButton class={"w-80 sm:w-96"}>
                        <span>Změnit heslo</span>
                    </PrimaryButton>
                </Link>

                <Link href={"./changename"}>
                    <PrimaryButton class={"w-80 sm:w-96"}>
                        <span>Změnit přihlašovací jméno</span>
                    </PrimaryButton>
                </Link>

            </div>

        </>

    )
})

export const head: DocumentHead = {
    title: "TdA Nastavení",
    meta: [
        {
            name: "description",
            content: "List všech lektorů Teacher Digital Agency"
        }
    ]
};
