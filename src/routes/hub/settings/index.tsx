import {component$} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {Link} from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";

export default component$(() => {
    const session = useAuthSession();
    return (
        <>
            <div class={"mt-20 px-4 mx-auto max-w-lg"}>
                <h2 class={"text-5xl sm:text-6xl font-display mb-1 sm:mb-2"}>{session.value?.user.first_name} {session.value?.user.middle_name} {session.value?.user.last_name}</h2>
                <h4 class={"font-medium text-lg sm:text-2xl font-display mb-4 sm:mb-10"}>Lektor</h4>
            </div>
            <div class={"mx-auto max-w-lg mb-5"}>
                <Link href={"./changepassword"}>
                    <PrimaryButton class={"w-80 sm:w-96"}>
                        <span>Změnit heslo</span>
                    </PrimaryButton>
                </Link>

            </div>
            <div class={"mx-auto max-w-lg"}>
                <Link href={"./changename"}>
                    <PrimaryButton class={"w-80 sm:w-96"}>
                        <span>Změnit přihlšovací jméno</span>
                    </PrimaryButton>
                </Link>

            </div>

        </>

    )
})
