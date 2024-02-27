import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";
import {Info} from "~/components/lecturer/info";
import {IoCallOutline, IoCashOutline, IoMailOutline, IoMapOutline} from "@qwikest/icons/ionicons";
import {ApiError} from "~/app/apiError";
import {Context} from "~/app/context";
import {getLecturer, getLecturerName, searchLecturer} from "~/app/lecturer";
import {PrimaryButton} from "~/components/ui/button";

export default component$(() => {
    const document = useDocument()


    return (
        <>
            <div class={"max-w-7xl sm:flex sm:flex-col md:mx-8 lg:mt-5 lg:flex-row sm:justify-center lg:mx-auto"}>
                {document.value.picture_url &&
                    <div class={"sm:mx-auto lg:mx-10"}>
                        <Profile
                            imageUrl={document.value.picture_url}
                            alt={document.value.name}/>
                    </div>
                }
                <div class="flex flex-col pt-8 lg:pt-4 px-6 w-full lg:ml-4">
                    <div>
                        <h1 class="text-default text-5xl font-display">{document.value.name}</h1>
                        {document.value.claim &&
                            <h2 class="text-default mt-4 text-xl font-normal">{document.value.claim}</h2>
                        }
                    </div>

                    <div>
                        {/* TODO: Reservation modal */}
                        <PrimaryButton class={"mt-8"}>
                            Zarezervovat
                        </PrimaryButton>
                    </div>

                    <div class="mt-10 flex sm:max-w-sm flex-wrap sm:flex-nowrap w-full gap-x-14">
                        {document.value.contact && <div>
                            <Info content={document.value.contact.telephone_numbers.map(i => ({
                                text: i,
                                href: `tel:${i.replaceAll(" ", "")}`
                            }))}>
                                <IoCallOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>

                            <Info content={document.value.contact.emails.map(i => ({
                                text: i,
                                href: `mailto:${i}`
                            }))}>
                                <IoMailOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>

                        </div>}
                        <div class={"flex-shrink-0"}>
                            {document.value.location && <Info content={[{text: document.value.location}]}>
                                <IoMapOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>}

                            {document.value.price_per_hour &&
                                <Info content={[{text: `${document.value.price_per_hour} Kč/h`}]}>
                                    <IoCashOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                                </Info>}
                        </div>
                    </div>

                    {document.value.bio && <div class="mt-5 text-default text-s font-normal max-w-3xl "
                                                dangerouslySetInnerHTML={document.value.bio}>
                    </div>}


                    {document.value.tags && <ul class={"sm:mt-10 mt-5 flex flex-wrap content-center"}>
                        {document.value.tags.map((tag, i) => (
                            <li class={"mr-2 text-slate-800 mb-2 px-4 text-sm py-1 bg-slate-100 rounded-lg"}
                                key={i}>#{tag.name}</li>
                        ))}
                    </ul>}
                </div>
            </div>
        </>
    );
});

export const useDocument = routeLoader$(async ({params, env, error}) => {
    const ctx = new Context({env})

    const searchResponse = await searchLecturer(ctx, "", {
        filter: [
            `route_url = ${params.id}`
        ]
    })

    if (!(searchResponse instanceof ApiError || searchResponse.hits.length === 0)) {
        return {
            ...searchResponse.hits[0],
            name: getLecturerName(searchResponse.hits[0])
        }
    }

    const response = await getLecturer(ctx, params.id)

    if (response instanceof ApiError) {
        throw error(404, "Lektor neexistuje")
    }

    return {
        ...response,
        name: getLecturerName(response)
    }
})

export const head: DocumentHead = ({resolveValue}) => {
    const document = resolveValue(useDocument)

    return {
        title: document.name,
        meta: [
            {
                name: "keywords",
                content: [
                    ...(document.claim?.split(" / ") || []),
                    ...(document.tags?.map(i => i.name) || [])
                ]
                    .join(", ")
            },
            {
                name: "description",
                content: document.claim || ""
            }
        ]
    }
}