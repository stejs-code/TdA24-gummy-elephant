import type {
    QRL} from "@builder.io/qwik";
import {
    $,
    component$,
    createContextId,
    useContext,
    useContextProvider,
    useSignal,
    useStore
} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {Image} from "@unpic/qwik";
import type {LecturerType} from "~/app/zod";
import {LuCog, LuLogOut, LuMenu, LuUser, LuX} from "@qwikest/icons/lucide";
import type {NotificationsProps} from "~/components/navigation/notifications";
import {Notifications} from "~/components/navigation/notifications";
import {cn} from "~/app/utils";
import {useOutsideAlerter} from "~/components/hooks/outsideClick";
import {Modal} from "@qwik-ui/headless";
import {getLecturerName} from "~/app/lecturer";

interface NavigationProps {
    user?: LecturerType,
    notification: NotificationsProps
}

export const NavContext = createContextId<NavigationProps>(
    'site.nav-context'
);


export const Navigation = component$<NavigationProps>((props) => {
    const store = useStore({
        ...props
    })
    useContextProvider(NavContext, store);

    return (
        <div class={"sticky top-0 z-30"}>
            <nav class={"w-full bg-white border-b border-slate-200 mb-2"}>
                <div class={"flex mx-auto max-w-6xl p-4 pb-3 items-center"}>
                    <Link href={"/"} prefetch={true} class={"flex-shrink-0"}>
                        <Image
                            class={"pointer-events-none"}
                            src={"/images/logo.svg"}
                            width={80}
                            height={53}
                            alt={"Teacher Digital Agency Logo"}
                        />
                    </Link>
                    <ul class={"items-center ml-8 hidden sm:flex"}>
                        {store.user && <li>
                            <Link href={"/hub/reservations/month-view"}>Rezervace</Link>
                        </li>}
                    </ul>
                    <ul class={"flex ml-auto items-center mr-2 gap-x-4"}>
                        {store.user && <li class={"hidden sm:block"}>
                            <UserButton/>
                        </li>}

                        {store.user && <li>
                            <Notifications/>
                        </li>}

                        {store.user && <li class={"sm:invisible"}>
                            <MobileMenu/>
                        </li>}
                    </ul>
                </div>
            </nav>
        </div>
    )
})

export const UserButton = component$<{ class?: string, onClose$?: QRL<() => void> }>(({class: className, onClose$}) => {
    const store = useContext(NavContext);
    const userPopupVisible = useSignal(false)
    const popup = useSignal<HTMLElement>()

    useOutsideAlerter(popup, $(() => userPopupVisible.value = false))

    return <div class={cn("relative", className)}>
        <button
            onClick$={() => userPopupVisible.value = !userPopupVisible.value}
            class={"flex w-full items-center transition-all border border-transparent hover:border-slate-200 p-2 pr-4 rounded-xl"}>
            <div
                class={"aspect-square w-9 flex items-center justify-center rounded-md bg-primary-50 text-primary-300 font-semibold mr-4"}>
                {((store.user?.first_name[0] || "") + (store.user?.last_name[0] || "")).toUpperCase()}
            </div>
            <p class={"leading-tight text-left"}>
                <span class={"font-semibold"}>
                    {store.user && getLecturerName(store.user)}
                </span>
                <br/>
                <span class={"text-slate-500"}>Lektor</span>
            </p>
        </button>
        <div
            ref={popup}
            class={cn("absolute z-50 right-0 invisible transition-all opacity-0 -translate-y-2 w-48 bg-white shadow-lg border-2 border-slate-100 rounded-xl p-2 flex flex-col items-stretch", userPopupVisible.value && "opacity-100 translate-y-1 visible")}>
            <Link
                href={`/hub/settings`}
                onClick$={() => onClose$ && onClose$()}
                class={"hover:bg-slate-50 transition-colors px-5 py-2 rounded-lg"}>
                <LuCog class={"-translate-x-2 text-xl mb-1 inline"}/> Nastavení
            </Link>
            <Link
                href={`/lecturer/${store.user?.uuid}`}
                onClick$={() => onClose$ && onClose$()}
                class={"hover:bg-slate-50 transition-colors px-5 py-2 rounded-lg"}>
                <LuUser class={"-translate-x-2 text-xl mb-1 inline"}/> Můj profil
            </Link>
            <form class={"flex"} action="/logout" method={"POST"}>
                <button
                    type={"submit"}
                    onClick$={() => onClose$ && onClose$()}
                    class={"w-full hover:bg-red-50 text-red-600 transition-colors rounded-lg text-left px-5 py-2"}>
                    <LuLogOut class={"-translate-x-2 text-xl mb-1 inline"}/> Odhlásit se
                </button>
            </form>
        </div>
    </div>
})

export const MobileMenu = component$(() => {
    const store = useContext(NavContext);
    const modalVisible = useSignal(false)

    return <>
        <button onClick$={() => {
            modalVisible.value = !modalVisible.value
        }}>
            <LuMenu class={"text-2xl"}/>
        </button>

        <Modal
            bind:show={modalVisible}
            class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full md:max-w-[90rem] rounded-l-md border-0 " +
                "bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100 px-6 py-4"}>

            <div class={"flex items-center justify-between mb-4 mt-2"}>
                <h2 class={"text-2xl font-bold"}>Menu</h2>
                <button
                    class="p-4"
                    onClick$={() => {
                        modalVisible.value = false
                    }}>
                    <LuX/>
                </button>
            </div>

            <div class={"flex w-72 flex-col mb-6"}>
                {store.user && <UserButton onClose$={$(() => {
                    modalVisible.value = false
                })} class={"w-full"}/>}
            </div>

            <ul class={"flex flex-col items-stretch"}>
                {store.user && <li>
                    <Link class={"text-lg"} href={"/hub/reservations/month-view"}>Rezervace</Link>
                </li>}
            </ul>

        </Modal>
    </>
})