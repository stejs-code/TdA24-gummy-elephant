import type {QRL, Signal} from "@builder.io/qwik";
import {$, component$, useSignal, useTask$, useVisibleTask$} from "@builder.io/qwik";
import {LuArrowBigLeft, LuX} from "@qwikest/icons/lucide";
import {PrimaryButton} from "~/components/ui/button";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import * as v from 'valibot';
import {formAction$, setValues, useForm, valiForm$} from "@modular-forms/qwik";
import {MultiRangeSlider} from "~/components/ui/multiRange";
import {InputLabel} from "~/components/ui/form";
import type {ReservationType} from "~/app/zod";
import {doesIntersect, getRanges} from "~/routes/lecturer/[id]";
import {Context} from "~/app/context";
import {deleteReservation, getUnix, updateReservation} from "~/app/reservation";
import {isBrowser} from "@builder.io/qwik/build";
import {server$} from "@builder.io/qwik-city";

interface Props {
    modalVisible: Signal<boolean>,
    data: ReservationType,
    onClose$: QRL<(reload: boolean) => void>
}

const EditSchema = v.object({
    date: v.coerce(v.date("Zadejte platné datum (pondělí až pátek)."), (value) => {
        if (typeof value === "string") return new Date(value)
        return value
    }),
    hourStart: v.number(),
    hourEnd: v.number(),
    note: v.string([
        v.maxLength(500, "Přesažen maximální limit poznámky (500 znaků)")
    ]),
    uuid: v.string()
});


type EditForm = v.Input<typeof EditSchema>;

const delReservation = server$(async function(id) {
    const ctx = new Context(this);
    return await deleteReservation(ctx, id);
})

export const Popup = component$((props: Props) => {
    const popUpVisible = useSignal(false)
    const currentStart = useSignal(props.data.hourStart)
    const currentEnd = useSignal(props.data.hourEnd)
    const ranges = useSignal<[number, number][]>([])


    const [editForm, {Form, Field}] = useForm<EditForm>({
        loader: {
            value: {
                date: new Date(props.data.dateAt),
                note: props.data.note,
                hourStart: props.data.hourStart,
                hourEnd: props.data.hourEnd,
                uuid: props.data.uuid
            }
        },
        validate: $(async (values) => {
            const response = await valiForm$(EditSchema)(values)

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
            return {...response}
        }),
        action: useFormAction()

    });

    useVisibleTask$(() => {
        props.modalVisible.value = true
    })

    useTask$(({track}) => {
        track(() => editForm.response.status)
        if (editForm.response.status === "success") {
            props.modalVisible.value = false
            props.onClose$(true)
        }
    })

    useTask$(async ({track}) => {
        track(() => editForm.internal.fields.date?.value)
        if (isBrowser && editForm.internal.fields.date?.value) {
            ranges.value = await getRanges(props.data.lecturer, editForm.internal.fields.date.value, [props.data.hourStart, props.data.hourEnd])
        }
    })

    useTask$(async ({track}) => {
        track(() => props.modalVisible.value)
        if (isBrowser && props.modalVisible.value && editForm.internal.fields.date?.value) {
            ranges.value = await getRanges(props.data.lecturer, new Date(new Date(editForm.internal.fields.date.value).toISOString().split("T")[0]), [props.data.hourStart, props.data.hourEnd])
        }
    })

    const handleSliderChange = $((data: {
        min: number,
        max: number
    }) => {
        setValues(editForm, {
            hourStart: data.min,
            hourEnd: data.max
        })
    })

    return (
        <>
            <Modal bind:show={props.modalVisible}
                   onClose$={() => props.onClose$(false)}
                   class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full lg:w-[600px] rounded-l-md border-0 bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

                <div class={"px-3 pt-3 sm:px-6 sm:py-2.5"}>
                    <div class={"flex items-center justify-between mb-6"}>
                        <h2 class={"text-2xl font-bold"}>Upravit rezervace</h2>
                        <div class="p-1 cursor-pointer"
                             onClick$={() => {
                                 props.modalVisible.value = false
                             }}><LuX/></div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Jméno:</p>
                            <input type="text" value={props.data.student.first_name} disabled={true}
                                   class={"bg-gray-50 px-3 py-1.5 border rounded-lg border-gray-300 w-full"}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Příjmení:</p>
                            <input type="text" value={props.data.student.last_name} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full"}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Email:</p>
                            <input type="email" value={props.data.student.email} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Telefon:</p>
                            <input type="tel" value={props.data.student.telephone} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Tag:</p>
                            <input type="text" value={props.data.tags[0]?.name || "- - -"} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Způsob setkání:</p>
                            <input type="text" value={props.data.meetingType} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <Form>
                        <Field type={"string"} name={"uuid"}>
                            {(store, p) => (
                                <>
                                    <input
                                        {...p}
                                        value={store.value}
                                        type={"hidden"}
                                    />
                                </>
                            )}
                        </Field>
                        <div class={"flex items-center gap-5 mb-5"}>
                            <Field type={"Date"} name="date">
                                {(store, p) => (
                                    <div class={"w-1/2"}>
                                        <p class={"mb-1"}>Datum:</p>
                                        <input
                                            {...p}
                                            value={store.value?.toISOString().split('T')[0]}
                                            type="date"
                                            disabled={false}
                                            class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full cursor-pointer"}/>
                                        <p class={"text-xs mt-1 text-red-500"}>
                                            {store.error || <span>&nbsp;</span>}
                                        </p>
                                    </div>
                                )}
                            </Field>
                            <div class={"w-1/2 translate-y-8"}>

                                <MultiRangeSlider
                                    id={"timeRange"}
                                    min={8}
                                    max={20}
                                    onChange={handleSliderChange}
                                    minValue={currentStart}
                                    maxValue={currentEnd}
                                    suffixLabel={":00"}
                                >

                                    {/* TODO: odstranit tuto rezervaci */}
                                    {ranges.value
                                        .filter(arr => !(arr[0] === props.data.hourStart && arr[1] === props.data.hourEnd))
                                        .map(([s, e]: [any, number], i: number) => (
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
                                    {(store, p) => (
                                        <>
                                            <input
                                                {...p}
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
                                    {(store, p) => (
                                        <>
                                            <input
                                                {...p}
                                                value={store.value}
                                                type={"hidden"}
                                            />
                                        </>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div class={"mb-5"}>
                            <Field type={"string"} name={"note"}>
                                {(store, p) => (
                                    <>
                                        <InputLabel label={"Poznámka"} name={"note"}/>
                                        <textarea
                                            class={"px-3.5 py-2 border rounded-lg border-gray-300 bg-white w-full resize-none"}
                                            {...p}
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
                        <div class={"w-full flex justify-between"}>
                            <PrimaryButton type="submit" class={"flex-shrink-0 w-sm"} onClick$={() => {

                            }}>
                                <span class={"inline"}

                                >Uložit</span>
                            </PrimaryButton>

                            <PrimaryButton type="button"
                                           class={"flex-shrink-0 w-sm bg-red-500 hover:bg-red-600 active:bg-red-600 focus:bg-red-500"}
                                           onClick$={() => {
                                               popUpVisible.value = true
                                           }}>
                                <span class={"inline"}

                                >Zrušit Schůzku</span>
                            </PrimaryButton>
                        </div>
                    </Form>
                </div>


            </Modal>

            <Modal
                alert
                bind:show={popUpVisible}
                class="rounded-md rounded-base max-w-[25rem] p-[28px] shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
            >
                <ModalHeader>
                    <h2 class="mb-2 text-lg font-bold ">Zrušit schůzku</h2>
                </ModalHeader>
                <ModalContent class="mb-2 pb-4 pt-2">
                    <p class="leading-5">Opravdu si přejete zrušit schůzku?</p>
                </ModalContent>
                <ModalFooter class="flex justify-end gap-4">
                    <button
                        type={"button"}
                        class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-base border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={ () => {popUpVisible.value = false;}}>
                        <span class={"flex items-center"}>
                            <LuArrowBigLeft/>
                            <p>Zpět</p>
                        </span>
                    </button>
                    <button
                        type={"button"}
                        class="text-red-500 bg-destructive focus:ring-destructive text-destructive-foreground focus-visible:destructive-foreground/90 rounded-base border border-none px-4 py-[10px] outline-none focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={async() => {
                            popUpVisible.value = false

                            await delReservation(props.data.uuid);
                        }}
                    >
                        Zrušit schůzku
                    </button>
                </ModalFooter>
                <button
                    onClick$={() => (popUpVisible.value = false)}
                    class="absolute right-6 top-[26px]"
                >
                    <div class="p-1 cursor-pointer"
                         onClick$={() => {
                             props.modalVisible.value = false
                             props.onClose$(false)
                         }}><LuX/></div>
                </button>
            </Modal>
        </>


    )
})

export const useFormAction = formAction$<EditForm>(async (values, {env}) => {
    const ctx = new Context({env})
    const dUnix = getUnix(new Date(values.date))

    await updateReservation(ctx, values.uuid, {
        dateAt: new Date(values.date),
        dateUnix: dUnix,
        hourEnd: values.hourEnd,
        hourStart: values.hourStart,
        note: values.note
    })

    return {
        status: "success"
    }
}, valiForm$(EditSchema))
