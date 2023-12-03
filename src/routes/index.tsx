import {component$, useStore, useTask$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import {Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";
import {ApiError} from "~/app/apiError";
import {z} from "zod";
import {Tag} from "~/app/tag";
import {array, type Input, object, string} from 'valibot';
import type {InitialValues} from "@modular-forms/qwik";
import {formAction$, submit, useForm, valiForm$} from "@modular-forms/qwik";
import type {SearchResponse} from "meilisearch";
import {forI} from "~/app/utils";
import {PrimaryButton, PrimaryButtonLink} from "~/components/ui/button";
import {Tags} from "~/components/ui/tag";
import {Spinner} from "~/components/ui/spinner";


export const zLecturerMask = z.object({
    uuid: z.string(),
    name: z.string(),
    route_url: z.string().nullish(),
    picture_url: z.string().nullish(),
    bio: z.string().nullish(),
    tags: z.string().array().default([]),
    claim: z.string().nullish()
})

const LoginSchema = object({
    query: string(),
    filters: array(string())
});

type LoginForm = Input<typeof LoginSchema>;
type ActionSearchResponse = Record<string, any> & SearchResponse<z.infer<typeof zLecturerMask>> & { filters: string[] }

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(({url}) => ({
    query: url.searchParams.get("q") || "",
    filters: url.searchParams.get("f")?.split(",") || []
}));

export const useFormAction = formAction$<LoginForm, ActionSearchResponse>(async (values, event) => {
    const filters = values.filters.map(i => `tags.alias = ${i}`)
    const lecturerResource = new Lecturer(getMeilisearch(event.env))
    const response = await lecturerResource.search(values.query, {
        page: 1,
        hitsPerPage: 20,
        filter: filters
    })

    if (response instanceof ApiError) {
        return {
            status: "error",
            message: "neočekavaná chyba při získávání lektorů"
        }
    }

    return {
        status: "success",
        data: {
            ...response,
            hits: response.hits.map(i => zLecturerMask.parse({
                ...i,
                name: [i.title_before, i.first_name, i.middle_name, i.last_name, i.title_after].filter(i => i).join(" "),
                tags: i.tags?.map(i => i.name),
                bio: i.bio?.split(" ").slice(0, 20).join(" ") + "..."
            })),
            filters: values.filters
        }
    }

}, valiForm$(LoginSchema));

export function getUrl(query: string, page: number, filters: string[]) {
    let url = "?"
    if (query !== "") url += `q=${query}&`
    if (page > 1) url += `p=${page}&`
    if (filters.length) url += `f=${filters.join(",")}`

    if (url.endsWith("&")) url = url.slice(0, -1)

    return url
}

export default component$(() => {
    const tags = useTags()
    const defaultValue = useLecturers()
    const data = useStore<ActionSearchResponse>(defaultValue.value)

    const [loginForm, {
        Form,
        Field
    }] = useForm<LoginForm, Record<string, any> & SearchResponse<z.infer<typeof zLecturerMask>>>({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: valiForm$(LoginSchema),
    });

    useTask$(({track}) => {
        track(() => loginForm.response.data)

        if (loginForm.response.status === "success") {
            for (const key in data) {
                if (loginForm.response.data) {
                    data[key] = loginForm.response.data[key]
                }
            }

            window.history.replaceState({}, "", getUrl(data.query, data.page || 1, data.filters));
        }
    })


    return (
        <>
            <div class={"w-full max-w-5xl m-auto px-4"}>
                <h1 class={"text-6xl font-display mb-4"}>Naši lektoři</h1>
                <Form reloadDocument={false}>

                    <Field name="query" type={"string"}>
                        {(field, props) => (
                            <div class={"flex "}>
                                <input
                                    {...props}
                                    type="search"
                                    class={"border appearance-none transition-colors w-full rounded-md border-slate-200 outline-0 px-4 focus:border-primary-300"}
                                    placeholder={"Hledat..."}
                                    onKeyUp$={() => {
                                        if (field.value !== data.query) {
                                            submit(loginForm)
                                        }
                                    }}
                                    onClick$={() => {
                                        if (field.value !== data.query) {
                                            submit(loginForm)
                                        }
                                    }}
                                    value={field.value}/>
                                <PrimaryButton type="submit" class={"ml-4"}>Hledat</PrimaryButton>
                            </div>
                        )}
                    </Field>

                    <div class={"flex flex-wrap gap-4 mt-6 mb-12 py-2"}>
                        {
                            tags.value.map(({name, alias}) => (
                                <Field key={alias} name="filters" type="string[]">
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
                                                        submit(loginForm)
                                                    }}
                                                />
                                                <span
                                                    class={"relative transition-colors px-4 py-1 bg-slate-100 rounded-md peer-checked:bg-primary-300 peer-checked:text-white hover:bg-slate-200"}>
                                                {name}
                                                </span>
                                            </label>
                                        </>
                                    )}
                                </Field>
                            ))
                        }
                    </div>
                </Form>

                <div class={`h-0 relative ${!data.hits.length ? "mb-24" : ""}`}>
                    <div
                        class={`absolute inset-x-0 top-0 hidden opacity-0 justify-center transition-opacity ${loginForm.submitting ? "!flex !visible !opacity-100" : ""} `}>
                        <Spinner/>
                    </div>
                    <div
                        class={`absolute inset-x-0 top-0 hidden opacity-0 justify-center transition-opacity ${!data.hits.length ? "!flex !visible !opacity-100" : ""} `}>
                        <p>
                            Nenalezen žádný lektor. <br/>
                            Zkuste <a href={"/?"} class={"text-primary-300 underline"}>vyresetovat filtry</a>.
                        </p>
                    </div>
                </div>

                <div class={`child:transition-opacity ${loginForm.submitting ? "child:opacity-0" : ""} `}>
                    {data.hits.map((i, index, array) => (<>
                        <div class={"flex flex-col content-center items-center sm:items-start sm:flex-row"}
                             key={i.uuid + data.processingTimeMs}>
                            {i.picture_url &&
                                <a class={"shrink-0 mr-8 mb-4"} href={`/lecturer/${i.route_url || i.uuid}`}>
                                    <img
                                        loading={index > 3 ? "lazy" : "eager"}
                                        width={225}
                                        height={225}
                                        src={i.picture_url}
                                        alt={i.name}/>
                                </a>
                            }
                            <div class={"py-2"}>
                                <a href={`/lecturer/${i.route_url || i.uuid}`}>
                                    <h2 class={"font-display text-4xl mb-4"}>{i.name}</h2>
                                </a>
                                <div class={"mb-2"}>
                                    <Tags tags={i.tags.map(i => ({name: i}))}/>
                                </div>

                                {i.bio && <p class={"mt-2"} dangerouslySetInnerHTML={i.bio}></p>}
                                <div class={"mt-6"}>
                                    <PrimaryButtonLink
                                        href={`/lecturer/${i.route_url || i.uuid}`}>Více</PrimaryButtonLink>
                                </div>
                            </div>
                        </div>

                        {(array.length - 1) !== index && <hr class={"my-10"}/>}
                    </>))}
                </div>

                <ul class={"flex mt-14 mb-8 gap-2 flex-wrap justify-center"}>

                    {!!data.totalPages && forI(data.totalPages, (i) => (
                        <li key={i}>
                            <a class={`w-8 text-center py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors block ${data.page === i && "bg-slate-200 hover:bg-slate-300"}`}
                               href={getUrl(data.query, i, data.filters)}>
                                {i}
                            </a>
                        </li>
                    ))}

                </ul>

            </div>
        </>
    );
});

export const useLecturers = routeLoader$(async (event) => {
    const page = Number(event.url.searchParams.get("p")) || 1
    const query = event.url.searchParams.get("q") || ""
    const filters = event.url.searchParams.get("f")?.split(",") || []

    const lecturerResource = new Lecturer(getMeilisearch(event.env))
    const response = await lecturerResource.search(query, {
        page,
        hitsPerPage: 20,
        filter: filters.map(i => `tags.alias = ${i}`)
    })

    if (response instanceof ApiError) {
        throw event.error(500, "neočekavaná chyba při získávání lektorů")
    }

    return {
        ...response,
        hits: response.hits.map(i => zLecturerMask.parse({
            ...i,
            name: [i.title_before, i.first_name, i.middle_name, i.last_name, i.title_after].filter(i => i).join(" "),
            tags: i.tags?.map(i => i.name),
            bio: i.bio?.split(" ").slice(0, 20).join(" ") + "..."
        })),
        filters: filters
    }
})

export const useTags = routeLoader$(async (event) => {
    const tagResource = new Tag(getMeilisearch(event.env))
    const response = await tagResource.list()

    if (response instanceof ApiError) {
        throw event.error(500, "neočekavaná chyba při získávání tagů")
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
