import {$, component$, useSignal, useStore, useTask$} from "@builder.io/qwik";
import type {FormStore} from "@modular-forms/qwik";
import {formAction$, getValue, reset, setValue, submit, useForm, valiForm$} from "@modular-forms/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import type {Input} from "valibot";
import {array, number, object, string} from "valibot";
import {Lecturer} from "~/app/lecturer";
import {ApiError} from "~/app/apiError";
import {Tag} from "~/app/tag";
import type {LecturerType, TagType} from "~/app/zod";
import {MultiRangeSlider} from "~/components/ui/multiRange";
import {InputLabel, SearchInput, SelectInput} from "~/components/ui/form";
import {Spinner} from "~/components/ui/spinner";
import {Tags} from "~/components/ui/tag";
import {Info} from "~/components/lecturer/info";
import {
    IoCashOutline,
    IoCloseOutline,
    IoFilterCircleOutline,
    IoMapOutline,
    IoSearchOutline
} from "@qwikest/icons/ionicons";
import {DefaultButton, PrimaryButton, PrimaryButtonLink} from "~/components/ui/button";
import {useDebounce} from "~/components/ui/debounce";
import type {SearchParams, SearchResponse} from "meilisearch";
import {getMeilisearch} from "~/app/meilisearch";
import {forI} from "~/app/utils";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {Hero} from "~/components/hero/hero";

export const SearchForm = object({
    query: string(),
    page: number(),
    tags: array(string()), // aliases
    priceRangeMin: number(),
    priceRangeMax: number(),
    location: string(),
    sort: string()
});

export type SearchForm = Input<typeof SearchForm>;
export type ActionResponse = Record<string, any> & SearchResponse<LecturerType>

export function exportFormToUrl(form: FormStore<SearchForm, ActionResponse>, pageOverride?: number) {
    const urlQuery = new URLSearchParams()

    const query = getValue(form, "query")
    if (query) urlQuery.set("q", query)

    const page = getValue(form, "page")
    if (pageOverride || page) urlQuery.set("p", String(pageOverride || page))

    const tags = getValue(form, "tags")
    if (tags?.length) urlQuery.set("tags", tags.join(","))

    const min = getValue(form, "priceRangeMin")
    if (min) urlQuery.set("min", String(min))

    const max = getValue(form, "priceRangeMax")
    if (max) urlQuery.set("max", String(max))

    const location = getValue(form, "location")
    if (location && location !== "- - -") urlQuery.set("loc", location)


    const sort = getValue(form, "sort")
    if (sort && sort !== "relevance") urlQuery.set("s", sort)

    return urlQuery.toString()
}


export default component$(() => {
    const tags = useTags()
    const locations = useLocations()
    const maxPrice = useMaxPrice()
    const formParameters = useFormLoader()
    const lecturers = useLecturers()

    const data = useStore<ActionResponse>(lecturers.value)
    const currentMin = useSignal(formParameters.value.priceRangeMin)
    const currentMax = useSignal(formParameters.value.priceRangeMax)
    console.log(formParameters.value.tags)
    const [searchForm, {Form, Field}] = useForm<SearchForm, ActionResponse>({
        loader: formParameters,
        validate: valiForm$(SearchForm),
        action: searchAction(),
    })

    const resetForm = $(() => {
        currentMin.value = 0
        currentMax.value = maxPrice.value
        reset(searchForm)
        setValue(searchForm, "query", "")
        setValue(searchForm, "page", 1)
        setValue(searchForm, "query", "")
        setValue(searchForm, "location", "")
        setValue(searchForm, "sort", "")
        setValue(searchForm, "tags", [])
        setValue(searchForm, "priceRangeMin", 0)
        setValue(searchForm, "priceRangeMax", maxPrice.value)
        submit(searchForm)
    })

    useTask$(({track}) => {
        track(() => searchForm.response.data)

        if (searchForm.response.status === "success") {
            for (const key in data) {
                if (searchForm.response.data) {
                    data[key] = searchForm.response.data[key]
                }
            }

            window.history.replaceState({}, "", "?" + exportFormToUrl(searchForm));
        }

    })

    const debounce = useSignal("")

    const debounced = $(() => {
        submit(searchForm)
    })

    const handleSliderChange = $((data: {
        min: number,
        max: number
    }) => {
        setValue(searchForm, "priceRangeMin", data.min)
        setValue(searchForm, "priceRangeMax", data.max)
        debounce.value = Math.random().toString(36)
    })

    useDebounce(debounce, 200, debounced)

    useTask$(({track}) => {
        track(() => searchForm.internal.fields.query?.value)
        if (getValue(searchForm, "query") !== data.query) {
            submit(searchForm)

            setValue(searchForm, "page", 1)
        }
    })

    useTask$(({track}) => {
        track(() => searchForm.internal.fields.tags?.value)
        track(() => searchForm.internal.fields.location?.value)
        track(() => searchForm.internal.fields.sort?.value)
        track(() => searchForm.internal.fields.page?.value)

        setValue(searchForm, "page", 1)

        submit(searchForm)
    })

    useTask$(({track}) => {
        track(() => searchForm.internal.fields.page?.value)

        submit(searchForm)
    })

    const modalVisible = useSignal(false)
    return (
        <>
            <Hero/>
            <div class={"w-full max-w-4xl m-auto px-4"}>
                <h1 class={"text-5xl sm:text-6xl font-display mb-4 pt-12 sm:mb-8"} id={"lecturers"}>Naši lektoři</h1>
                <Modal
                    bind:show={modalVisible}
                    class="sheet shadow-dark-medium overflow-y-hidden max-h-[100vh] fixed right-0 inset-y-0 my-0 mr-0 h-[100vh] max-w-[25rem] rounded-l-md border-0 bg-white p-6 text-slate-950 backdrop:backdrop-blur backdrop:backdrop-brightness-100"
                >
                    <ModalHeader>
                        <h2 class="text-lg font-bold">Filtry</h2>
                    </ModalHeader>
                    <ModalContent class="mb-2 py-4 overflow-y-scroll h-full">
                        <Field name="sort" type={"string"}>
                            {(field, props) => (
                                <>
                                    <InputLabel name={props.name} label={"Řazení dle"}/>
                                    <SelectInput
                                        value={field.value}
                                        {...props}>
                                        <option selected={true} value={"relevance"}>Relevance</option>
                                        <option selected={false} value={"price_per_hour:desc"}>Cena od nejdražšího
                                        </option>
                                        <option selected={false} value={"price_per_hour:asc"}>Cena od nejlevnějšího
                                        </option>

                                    </SelectInput>
                                </>
                            )}
                        </Field>


                        <Field name="location" type={"string"}>
                            {(field, props) => (
                                <>
                                    <InputLabel name={props.name} label={"Lokace"}/>
                                    <SelectInput
                                        value={field.value}
                                        {...props}>
                                        <option selected={true} value={"- - -"}>- - -</option>
                                        {locations.value.map(i => <option key={i.name} value={i.name}>
                                            {`${i.name} (${i.count})`}
                                        </option>)}
                                    </SelectInput>
                                </>
                            )}
                        </Field>

                        <InputLabel name={"priceRangeMax"} label={"Cena za hodinu"}/>
                        <MultiRangeSlider
                            min={0}
                            max={maxPrice.value}
                            onChange={handleSliderChange}
                            minValue={currentMin}
                            maxValue={currentMax}
                        />

                        <InputLabel name={"tags"} label={"Značky"}/>
                        <div class={"flex flex-wrap gap-4 mb-12 py-2"}>
                            {
                                tags.value.map(({name, alias}) => (
                                    <Field key={alias} name="tags" type="string[]">
                                        {(field, props) => (
                                            <>
                                                <label>
                                                    <input
                                                        {...props}
                                                        type="checkbox"
                                                        class={"peer hidden"}
                                                        value={alias}
                                                        checked={field.value?.includes(alias)}
                                                        onChange$={() => {
                                                            submit(searchForm)
                                                        }}
                                                    />
                                                    <span
                                                        class={"relative transition-colors px-4 py-1 bg-slate-100 rounded-md peer-checked:bg-primary-300 peer-checked:text-white hover:bg-slate-200"}>
                                                #{name}
                                                </span>
                                                </label>
                                            </>
                                        )}
                                    </Field>
                                ))
                            }
                        </div>
                        <div class={"py-4"}></div>
                    </ModalContent>
                    <ModalFooter class="flex gap-4 absolute bottom-0 px-6 py-6 inset-x-0 bg-white">
                        <PrimaryButton type="submit" onClick$={() => {
                            modalVisible.value = false
                        }}>Hledat</PrimaryButton>
                        <DefaultButton type="submit" onClick$={async () => {
                            modalVisible.value = false
                            await resetForm()
                        }}>Resetovat</DefaultButton>
                    </ModalFooter>
                    <button
                        onClick$={() => (modalVisible.value = false)}
                        class="absolute right-6 top-6"
                    >
                        {/*<CloseIcon class="h-8 w-8" />*/}
                        <IoCloseOutline class={"text-2xl"}/>
                    </button>
                </Modal>

                <Form reloadDocument={false}>
                    <Field name={"page"} type={"number"}>
                        {(field, props) => (
                            <input type="hidden" value={field.value} {...props}/>
                        )}
                    </Field>

                    <Field name={"priceRangeMin"} type={"number"}>
                        {(field, props) => (
                            <input type="hidden" value={field.value} {...props}/>
                        )}
                    </Field>

                    <Field name={"priceRangeMax"} type={"number"}>
                        {(field, props) => (
                            <input type="hidden" value={field.value} {...props}/>
                        )}
                    </Field>

                    <Field name={"query"} type={"string"}>
                        {(field, props) => (
                            <>
                                <div class={"flex mb-8 sm:mb-12 gap-4"}>
                                    <DefaultButton
                                        type="button"
                                        class={"flex-shrink-0 w-sm"}
                                        onClick$={() => (modalVisible.value = true)}
                                    >
                                        <IoFilterCircleOutline class={"sm:-translate-x-2 text-xl mb-1 inline "}/>
                                        <span class={"hidden sm:inline"}>Filtry</span>
                                    </DefaultButton>
                                    <SearchInput
                                        placeholder={"Hledat..."}
                                        value={field.value}
                                        {...props}/>
                                    <PrimaryButton type="submit" class={"flex-shrink-0 w-sm"}>
                                        <IoSearchOutline class={"sm:-translate-x-2 text-xl mb-1 inline"}/>
                                        <span class={"hidden sm:inline"}>Hledat</span>
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                    </Field>

                    <div class={`h-0 relative ${!data.hits.length ? "mb-24" : ""}`}>
                        <div
                            class={`absolute inset-x-0 top-0 hidden opacity-0 justify-center transition-opacity ${searchForm.submitting ? "!flex !visible !opacity-100" : ""} `}>
                            <Spinner/>
                        </div>
                        <div
                            class={`absolute inset-x-0 top-0 hidden opacity-0 justify-center transition-opacity py-4 ${!data.hits.length ? "!flex !visible !opacity-100" : ""} `}>
                            <p>
                                Nenalezen žádný lektor. <br/>
                                Zkuste <button
                                role={"button"}
                                onClick$={async () => {
                                    modalVisible.value = false
                                    await resetForm()
                                }}
                                class={"text-primary-300 underline"}>vyresetovat filtry</button>.
                            </p>
                        </div>
                    </div>

                    <div class={`child:transition-opacity ${searchForm.submitting ? "child:opacity-0" : ""} `}>
                        {data.hits.map((i, index, array) => (<>
                            <div class={"flex flex-col content-center items-center sm:items-start sm:flex-row"}
                                 key={i.uuid + data.processingTimeMs}>
                                {i.picture_url &&
                                    <a class={"shrink-0 mr-8 mb-4"} href={`/lecturer/${i.uuid}`}>
                                        <img
                                            loading={index > 3 ? "lazy" : "eager"}
                                            width={225}
                                            height={225}
                                            src={i.picture_url}
                                            alt={Lecturer.getName(i)}/>
                                    </a>
                                }
                                <div class={"py-2"}>
                                    <a href={`/lecturer/${i.uuid}`}>
                                        <h2 class={"font-display text-4xl mb-4"}>{Lecturer.getName(i)}</h2>
                                    </a>
                                    <div class={"mb-4"}>
                                        <Tags tags={i.tags || []}/>
                                    </div>

                                    {(i.price_per_hour || i.location) && <div class={"flex flex-wrap pl-2"}>
                                        {i.price_per_hour &&
                                            <Info content={[{text: `${i.price_per_hour} Kč/h`}]} class={"mr-16 !mb-0"}>
                                                <IoCashOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                                            </Info>}

                                        {i.location && <Info content={[{text: i.location}]}>
                                            <IoMapOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                                        </Info>}
                                    </div>}

                                    {i.claim && <p>„{i.claim}“</p>}
                                    {i.bio && <p class={"mt-2"} dangerouslySetInnerHTML={i.bio}></p>}
                                    <div class={"mt-6"}>
                                        <PrimaryButtonLink
                                            href={`/lecturer/${i.uuid}`}>Více</PrimaryButtonLink>
                                    </div>
                                </div>
                            </div>

                            {(array.length - 1) !== index && <hr class={"my-10"}/>}
                        </>))}
                    </div>

                    <ul class={"flex mt-14 mb-8 gap-2 flex-wrap justify-center"}>
                        {!!data.totalPages && forI(data.totalPages, (i) => (
                            <li key={i}>
                                <a href={`?${exportFormToUrl(searchForm, i) || i}`}
                                   class={`w-8 text-center py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors block ${data.page === i && "bg-slate-200 hover:bg-slate-300"}`}>
                                    {i}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Form>

            </div>
        </>
    )
})

export function getSearchOptions(input: SearchForm): SearchParams {
    const filters = input.tags.map(i => `tags.alias = ${i}`)
    return {
        page: input.page,
        hitsPerPage: 20,
        sort: (input.sort === "" || input.sort === "relevance") ? undefined : [input.sort],
        filter: [
            ...filters,
            [`price_per_hour ${input.priceRangeMin} TO ${input.priceRangeMax}`, (input.priceRangeMin === 0) ? "price_per_hour IS NULL" : ""],
            (input.location === "" || input.location === "- - -") ? "" : `location = ${input.location}`
        ]
    }
}

export const searchAction = formAction$<SearchForm, ActionResponse>(async (values, event) => {
    const lecturerResource = new Lecturer(getMeilisearch(event.env))
    const response = await lecturerResource.search(values.query, getSearchOptions(values))

    if (response instanceof ApiError) {
        return {
            status: "error",
            message: "Neočekavaná chyba při získávání lektorů"
        }
    }

    return {
        status: "success",
        data: {
            ...response
        }
    }

}, valiForm$(SearchForm))

export const useMaxPrice = routeLoader$(async ({env}) => {
    const response = await Lecturer.use(env).search("", {
        sort: ["price_per_hour:desc"],
        limit: 1
    })

    return (response instanceof ApiError)
        ? 1200
        : response.hits[0]?.price_per_hour || 1200

})

export const useFormLoader = routeLoader$<SearchForm>(async ({resolveValue, query}) => {
    const priceRangeMax = await resolveValue(useMaxPrice)

    return {
        query: query.get("q") || "",
        tags: query.get("tags")?.split(",") || [],
        priceRangeMin: Number(query.get("min") || 0),
        page: Number(query.get("p") || 1),
        location: query.get("loc") || "",
        sort: query.get("s") || "",
        priceRangeMax: Number(query.get("max") || priceRangeMax)
    };
});

export const useTags = routeLoader$<TagType[]>(async ({env}) => {
    const response = await Tag.use(env).list()

    if (response instanceof ApiError) {
        return []
    }

    return response
});

export const useLocations = routeLoader$<{
    name: string,
    count: number
}[]>(async ({env}) => {
    const response = await Lecturer.use(env).search("", {
        limit: 0,
        facets: ["location"]
    })

    if (response instanceof ApiError || !response.facetDistribution?.location) {
        return []
    }

    return Object.entries(response.facetDistribution.location).map(([k, v]) => ({
        name: k,
        count: v
    }))
});

export const useLecturers = routeLoader$(async ({env, error, resolveValue}) => {
    const input = await resolveValue(useFormLoader)
    const response = await Lecturer.use(env).search(input.query, getSearchOptions(input))

    if (response instanceof ApiError) {
        throw error(500, "Chyba při načítání lektorů")
    }

    return response
})

export const head: DocumentHead = {
    title: "Teacher Digital Agency",
    meta: [
        {
            name: "description",
            content: "List všech lektorů Teacher Digital Agency"
        }
    ]
};
