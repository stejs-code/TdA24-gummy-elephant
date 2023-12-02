import {component$} from "@builder.io/qwik";


export const Tags = component$(({tags}: { tags: { name: string }[] }) => {
    return (
        <ul class={"flex flex-wrap content-center"}>
            {tags.map((tag, i) => (
                <li class={"mr-2 text-slate-800 mb-2 px-4 text-sm py-1 bg-slate-100 rounded-lg"}
                    key={i}>#{tag.name}</li>
            ))}
        </ul>
    )
})