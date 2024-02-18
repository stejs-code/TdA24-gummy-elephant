import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {Image} from "@unpic/qwik";
import type {LecturerType} from "~/app/zod";


export const Navigation = component$<{ user: LecturerType | undefined }>(({user}) => {
    return (
        <>
            <nav class={"w-full bg-white border-b border-slate-200"}>
                <div class={"flex mx-auto max-w-6xl p-6 items-center"}>
                    <Link href={"/"} prefetch={true}>
                        <Image
                            class={"pointer-events-none"}
                            src={"/images/logo.svg"}
                            width={80}
                            height={53}
                            alt={"Teacher Digital Agency Logo"}
                        />
                    </Link>
                    <ul class={"flex ml-auto"}>
                        <li>
                            <div class={"flex items-center"}>
                                <div
                                    class={"aspect-square py-1.5 w-9 rounded-md bg-primary-50 text-primary-300 font-semibold text-center mr-4"}>
                                    {((user?.first_name[0] || "") + (user?.last_name[0] || "")).toUpperCase()}
                                </div>
                                <p class={"leading-tight"}>
                                <span class={"font-semibold"}>
                                    {[user?.title_before, user?.first_name, user?.middle_name, user?.last_name, user?.title_after].join(" ")}
                                </span>
                                    <br/>
                                    <span class={"text-slate-500"}>Lektor</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    )
})