import type {Signal} from "@builder.io/qwik";
import {component$, $, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {LuArrowBigLeft, LuX} from "@qwikest/icons/lucide";
import {PrimaryButton} from "~/components/ui/button";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import * as v from 'valibot';
import {formAction$, setValues, useForm, valiForm$} from "@modular-forms/qwik";
import {MultiRangeSlider} from "~/components/ui/multiRange";
import {InputLabel} from "~/components/ui/form";

interface Props {
    first_name: string,
    last_name: string,
    email: string,
    phone: number,
    date: Date,
    time: number[],
    note: string,
    tagName: string,
    meetingType: string,
    modalVisible: Signal<boolean>
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
});

type EditForm = v.Input<typeof EditSchema>;

export const Popup = component$((props: Props) => {
    const popUpVisible = useSignal(false)
    const modalVisible = props.modalVisible
    const currentStart = useSignal(8)
    const currentEnd = useSignal(20)
    const ranges = useSignal<[number, number][]>([])


    const [editForm, { Form, Field }] = useForm<EditForm>({
        loader: {value: {date: props.date, note: props.note, hourStart: props.time[0], hourEnd: props.time[1]}},
        validate: $(async (values) => {
            const response = await valiForm$(EditSchema)(values)

            // if (values.hourEnd && values.hourStart) {
            //     const [S, E] = [values.hourStart, values.hourEnd]
            //     for (const [s, e] of ranges.value) {
            //         if (doesIntersect([S, E], [s, e])) {
            //             response.hourStart = "Vyberte čas mimo již zamluvenou (červenou) dobu."
            //         }
            //     }
            // }
            //
            // // 6 – Saturday, 0 – Sunday
            // if ([6, 0].includes(values.date?.getDay() as number)) {
            //     response.date = "Vyberte jiný den než sobotu a neděli."
            // }
            return {...response}
        }),
        action: useFormAction()

      });

      useVisibleTask$(() => {
        modalVisible.value = true;
  });

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
            <button onClick$={() => {modalVisible.value = true}}>Open</button>
            <Modal bind:show={modalVisible}
                   class={"overflow-y-scroll sheet shadow-dark-medium max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-full md:w-[40vw] rounded-l-md border-0 bg-white p-0 sm:p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"}>

                <div class={"px-3 pt-3 sm:px-6 sm:py-2.5"}>
                    <div class={"flex items-center justify-between mb-6"}>
                        <h2 class={"text-2xl font-bold"}>Rezervace 16 - 19</h2>
                        <div class="p-1 cursor-pointer"
                             onClick$={() => {
                                 modalVisible.value = false
                             }}><LuX/></div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Jméno:</p>
                            <input type="text" value={props.first_name} disabled={true}
                                   class={"bg-gray-50 px-3 py-1.5 border rounded-lg border-gray-300 w-full"}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Příjmení:</p>
                            <input type="text" value={props.last_name} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full"}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Email:</p>
                            <input type="email" value={props.email} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Telefon:</p>
                            <input type="tel" value={props.phone} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <div class={"flex items-center gap-5 mb-5"}>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Tag:</p>
                            <input type="text" value={props.tagName} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                        <div class={"w-1/2"}>
                            <p class={"mb-1"}>Způsob setkání:</p>
                            <input type="text" value={props.meetingType} disabled={true}
                                   class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-gray-50 w-full "}/>
                        </div>
                    </div>
                    <Form>
                        <div class={"flex items-center gap-5 mb-5"}>

                            <Field type={"Date"} name="date">
                                {(store, p) => (
                                <div class={"w-1/2"}>
                                    <p class={"mb-1"}>Datum:</p>
                                    <input {...p} type="date" value={store.value} disabled={false}
                                           class={"px-3 py-1.5 border rounded-lg border-gray-300 bg-white w-full cursor-pointer"}/>
                                </div>    
                                )}
                                
                            </Field>
                            <div class={"w-1/2"}>
                                <MultiRangeSlider
                                    id={"timeRange"}
                                    min={8}
                                    max={20}
                                    onChange={handleSliderChange}
                                    minValue={currentStart}
                                    maxValue={currentEnd}
                                    suffixLabel={":00"}
                                >

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
                                modalVisible.value = false
                            }}>
                                <span class={"inline"}

                                >Uložit</span>
                            </PrimaryButton>

                            <PrimaryButton type="submit" class={"flex-shrink-0 w-sm bg-red-500 hover:bg-red-600 active:bg-red-600 focus:bg-red-500"} onClick$={() => {
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
                        class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-base border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
                    >
                        <span class={"flex items-center"}>
                            <LuArrowBigLeft/>
                            <p>Zpět</p>
                        </span>
                    </button>
                    <button
                        class="text-red-500 bg-destructive focus:ring-destructive text-destructive-foreground focus-visible:destructive-foreground/90 rounded-base border border-none px-4 py-[10px] outline-none focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
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
                             modalVisible.value = false
                         }}><LuX/></div>
                </button>
            </Modal>
        </>


    )
})

export const useFormAction = formAction$<EditForm>(async () => {

}, valiForm$(EditSchema))
