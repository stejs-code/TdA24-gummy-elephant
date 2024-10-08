import {$, component$, useSignal, useTask$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$, server$} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";
import {Info} from "~/components/lecturer/info";
import {IoCallOutline, IoCashOutline, IoMailOutline, IoMapOutline} from "@qwikest/icons/ionicons";
import {ApiError} from "~/app/apiError";
import {Context} from "~/app/context";
import {getLecturer, getLecturerName, searchLecturer} from "~/app/lecturer";
import {PrimaryButton} from "~/components/ui/button";
import {LuX} from "@qwikest/icons/lucide";
import {Modal, ModalContent, ModalHeader} from "@qwik-ui/headless";
import {InputLabel, SelectInput, TextInput} from "~/components/ui/form";
import * as v from 'valibot';
import type {InitialValues} from "@modular-forms/qwik";
import {formAction$, setValues, useForm, valiForm$} from "@modular-forms/qwik";
import type {ReservationType, TagType} from "~/app/zod";
import {getTag, listTags} from "~/app/tag";
import {MultiRangeSlider} from "~/components/ui/multiRange";
import {isBrowser} from "@builder.io/qwik/build";
import {createReservation, getLecturerReservations, getUnix} from "~/app/reservation";

export const ReservationFormSchema = v.object({
    email: v.string([
        v.minLength(1, 'Zadejte svůj e-mail.'),
        v.email('Tento e-mail není platný.'),
    ]),
    first_name: v.string([
        v.minLength(1, 'Zadejte svoje jméno.'),
    ]),
    last_name: v.string([
        v.minLength(1, 'Prosím zadejte svoje příjmení.'),
    ]),
    telephone: v.string([
        v.minLength(1, 'Zadejte svoje telefoní číslo.'),
    ]),
    tagId: v.optional(v.string()),
    date: v.coerce(v.date("Zadejte platné datum (pondělí až pátek)."), (value) => {
        if (typeof value === "string") return new Date(value)
        return value
    }),
    hourStart: v.number(),
    hourEnd: v.number(),
    note: v.string([
        v.maxLength(500, "Přesažen maximální limit poznámky (500 znaků)")
    ]),
    meetingType: v.union([v.literal("online"), v.literal("offline")], "Vyberte typ meetingu."),
    lecturer: v.string(),
});

export type ReservationFormType = v.Input<typeof ReservationFormSchema>

export default component$(() => {
    const document = useDocument()
    const modalVisible = useSignal(false)
    const tags = useTags()
    const currentStart = useSignal(8)
    const currentEnd = useSignal(20)
    const ranges = useSignal<[number, number][]>([])
    const popUpVisible = useSignal(false)

    const [reservationForm, {Form, Field}] = useForm<ReservationFormType>({
        loader: useFormLoader(),
        validate: $(async (values) => {
            const response = await valiForm$(ReservationFormSchema)(values)

            if (values.hourEnd && values.hourStart) {
                const [S, E] = [values.hourStart, values.hourEnd]
                for (const [s, e] of ranges.value) {
                    if (doesIntersect([S, E], [s, e])) {
                        response.hourStart = "Vyberte čas mimo již zamluvenou (červenou) dobu."
                    }
                }
            }

            // 6 – Saturday, 0 – Sunday
            if ([6, 0].includes(values.date?.getDay() as number)) {
                response.date = "Vyberte jiný den než sobotu a neděli."
            }

            if (values.date) {
                if (getUnix(new Date(values.date)) - getUnix(new Date()) < 86400) {
                    response.date = "Rezervace nejdříve 24 hodin předem."
                }
            }
            return {...response}
        }),
        action: useFormAction()
    });

    useTask$(async ({track}) => {
        track(() => reservationForm.internal.fields.date?.value)
        if (isBrowser && reservationForm.internal.fields.date?.value) {
            ranges.value = await getRanges(document.value.uuid, reservationForm.internal.fields.date.value)
        }
    })

    useTask$(async ({track}) => {
        track(() => modalVisible.value)
        if (isBrowser && modalVisible.value && reservationForm.internal.fields.date?.value) {
            ranges.value = await getRanges(document.value.uuid, new Date(new Date(reservationForm.internal.fields.date.value).toISOString().split("T")[0]))
        }
    })

    useTask$(async ({track}) => {
        track(() => reservationForm.response.status)
        if (reservationForm.response.status === "success") {
            modalVisible.value = false;
            popUpVisible.value = !popUpVisible.value
        }
    })


    const handleSliderChange = $((data: {
        min: number,
        max: number
    }) => {
        setValues(reservationForm, {
            hourStart: data.min,
            hourEnd: data.max
        })
    })

    return (
        <div class={"mt-20"}>
            {reservationForm.response.status === "error" && reservationForm.response.message}
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
                        <PrimaryButton class={"mt-8"} onClick$={() => modalVisible.value = true}>
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

            <Modal bind:show={modalVisible}
                   class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full md:max-w-[90rem] rounded-l-md border-0 bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

                <Form autoComplete={"on"} class={"px-3 pt-3 sm:px-6 sm:py-2.5 flex flex-col gap-y-1"}>
                    <div class={"flex items-center justify-between mb-6"}>
                        <h2 class={"text-2xl font-bold"}>Nová rezervace</h2>
                        <div class="p-1 cursor-pointer"
                             onClick$={() => {
                                 modalVisible.value = false
                             }}><LuX/></div>
                    </div>
                    <Field type={"string"} name={"lecturer"}>
                        {(store, props) => (
                            <input
                                {...props}
                                value={store.value}
                                type="hidden"/>
                        )}
                    </Field>
                    <div class={"flex items-center gap-5"}>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"first_name"}>
                                {(store, props) => (
                                    <TextInput
                                        {...props}
                                        value={store.value}
                                        required={true}
                                        label={"Jméno"}
                                        autoComplete={"given-name"}
                                        error={store.error}
                                    />
                                )}
                            </Field>
                        </div>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"last_name"}>
                                {(store, props) => (
                                    <TextInput
                                        {...props}
                                        value={store.value}
                                        required={true}
                                        label={"Příjmení"}
                                        autoComplete={"family-name"}
                                        error={store.error}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5"}>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"email"}>
                                {(store, props) => (
                                    <TextInput
                                        {...props}
                                        value={store.value}
                                        label={"E-mail"}
                                        required={true}
                                        autoComplete={"email"}
                                        error={store.error}
                                    />
                                )}
                            </Field>
                        </div>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"telephone"}>
                                {(store, props) => (
                                    <TextInput
                                        {...props}
                                        value={store.value}
                                        label={"Telefon"}
                                        required={true}
                                        autoComplete={"tel"}
                                        error={store.error}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5"}>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"tagId"}>
                                {(store, props) => (
                                    <>
                                        <InputLabel name={props.name} label={"Značka"}/>
                                        <SelectInput {...props} value={store.value}>
                                            <option value={""}>- - -</option>
                                            {tags.value.map((i) => (
                                                <option key={i.uuid} value={i.uuid}>{i.name}</option>
                                            ))}
                                        </SelectInput>
                                    </>
                                )}
                            </Field>
                        </div>
                        <div class={"w-1/2"}>
                            <Field type={"string"} name={"meetingType"}>
                                {(store, props) => (
                                    <>
                                        <InputLabel name={props.name} label={"Typ meetingu"}/>
                                        <SelectInput {...props} value={store.value}>
                                            required={true}
                                            <option value={"online"}>Online</option>
                                            <option value={"offline"}>Offline</option>

                                        </SelectInput>
                                    </>
                                )}
                            </Field>
                        </div>

                    </div>
                    <div class={"flex items-start gap-5"}>
                        <div class={"w-1/2"}>
                            <Field type={"Date"} name={"date"}>
                                {(store, props) => (
                                    <TextInput
                                        {...props}
                                        required={true}
                                        type={"date"}
                                        value={store.value?.toISOString().split('T')[0]}
                                        label={"Datum"}
                                        error={store.error}
                                    />
                                )}
                            </Field>
                        </div>
                        <div class={"w-1/2"}>
                            <InputLabel required={true} label={"Čas"} name={"timeRange"}/>
                            <MultiRangeSlider
                                id={"timeRange"}
                                min={8}
                                max={20}
                                onChange={handleSliderChange}
                                minValue={currentStart}
                                maxValue={currentEnd}
                                suffixLabel={":00"}
                            >
                                {/*[*/}
                                {/*[8, 9],*/}
                                {/*[10, 15],*/}
                                {/*[19, 20]*/}
                                {/*]*/}
                                {ranges.value.map(([s, e], i) => (
                                    <div
                                        key={i}
                                        class={"slider__mark absolute bg-red-500 "}
                                        style={{
                                            zIndex: 5,
                                            left: `${(100 / 12) * (s - 8)}%`,
                                            right: `${(100 - (100 / 12) * (e - 8))}%`
                                        }}
                                    />

                                ))}
                            </MultiRangeSlider>
                            <Field type={"number"} name={"hourStart"}>
                                {(store, props) => (
                                    <>
                                        <input
                                            {...props}
                                            value={store.value}
                                            type={"hidden"}
                                        />
                                        <p class={"text-xs mt-1 text-red-500"}>
                                            {store.error || <span>&nbsp;</span>}
                                        </p>
                                    </>
                                )}
                            </Field>
                            <Field type={"number"} name={"hourEnd"}>
                                {(store, props) => (
                                    <>
                                        <input
                                            {...props}
                                            value={store.value}
                                            type={"hidden"}
                                        />
                                    </>
                                )}
                            </Field>
                        </div>
                    </div>
                    <div>
                        <Field type={"string"} name={"note"}>
                            {(store, props) => (
                                <>
                                    <InputLabel label={"Poznámka"} name={"note"}/>
                                    <textarea
                                        class={"px-3.5 py-2 border rounded-lg border-gray-300 bg-white w-full resize-none"}
                                        {...props}
                                        id={"note"}
                                        cols={50}
                                        rows={6}
                                        value={store.value}/>

                                    <p class={"text-xs mt-1 text-red-500"}>
                                        {store.error || <span>&nbsp;</span>}
                                    </p>
                                </>
                            )}
                        </Field>

                    </div>
                    <div>
                        <PrimaryButton type={"submit"}>
                            Odeslat
                        </PrimaryButton>
                    </div>
                </Form>
            </Modal>
        <Modal
            bind:show={popUpVisible}
            class="rounded-lg rounded-base max-w-[25rem] p-3 shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100 "
        >
            <ModalHeader>
                <div class={"py-3 flex gap-3 items-center justify-between"}>
                    <h2 class="pl-2 text-lg font-bold ">Lekce byla zarezervována</h2>
                    <button
                        type={"button"}
                        onClick$={() => (popUpVisible.value = false)}
                        class="px-2"
                    >
                        <div class="p-1 cursor-pointer"><LuX/></div>
                    </button>
                </div>
            </ModalHeader>
            <ModalContent>
                <p class="leading-5 pl-2 pb-3">Těšíme se na vás!</p>
            </ModalContent>

        </Modal>
        </div>
    );
});

export const useFormAction = formAction$<ReservationFormType>(async (values, event) => {
    const ctx = new Context(event);
    const date = new Date();
    const dateAt = new Date(values.date.toString().split("T")[0])

    const reservation: Omit<ReservationType, "uuid"> = {
        lecturer: values.lecturer,
        note: values.note,
        meetingType: values.meetingType,
        dateAt: dateAt,
        dateUnix: getUnix(dateAt),
        createdAt: date,
        createdUnix: getUnix(date),
        hourStart: values.hourStart,
        hourEnd: values.hourEnd,
        tags: [],
        student: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            telephone: values.telephone,
        },
    }

    if (values.tagId) {
        const tag = await getTag(ctx, values.tagId)
        if (!(tag instanceof ApiError)) {
            reservation.tags.push(tag)
        }
    }

    const res = await createReservation(ctx, reservation)
    if (res instanceof ApiError) return {status: "error", message: res.message}
    return {status: "success", message: "Reserved!"}

}, valiForm$(ReservationFormSchema));

export function doesIntersect([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    const endMin = (startA < startB) ? endA : endB
    const startMax = (startA < startB) ? startB : startA

    return endMin > startMax;


}

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

export const useFormLoader = routeLoader$<InitialValues<ReservationFormType>>(async ({resolveValue}) => {
    const document = await resolveValue(useDocument)

    // return {
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     telephone: "",
    //     tagId: "",
    //     date: new Date(),
    //     hourStart: 8,
    //     hourEnd: 20,
    //     note: "",
    //     lecturer: document.uuid,
    //     meetingType: "offline"
    // }

    return {
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        tagId: "",
        meetingType: "online",
        date: new Date(),
        hourStart: 8,
        hourEnd: 20,
        note: "",
        lecturer: document.uuid,
    }
});

export const useTags = routeLoader$<TagType[]>(async ({env}) => {
    const ctx = new Context({env})
    const response = await listTags(ctx)

    if (response instanceof ApiError) {
        return []
    }

    return response
});

export const getRanges = server$(async function (lecturerId: string, date: Date, excludeThis: number[] | undefined = undefined): Promise<[number, number][]> {
    const ctx = new Context(this)
    const lectures: any[] = [];

    const reservations = await getLecturerReservations(ctx, lecturerId, date)
    if (!(reservations instanceof ApiError)) {
        reservations.map(r => {
            if(excludeThis && (excludeThis[0] === r.hourStart && excludeThis[1] === r.hourEnd)) return;
            lectures.push([r.hourStart, r.hourEnd])
        })
    }
    return lectures;
})
