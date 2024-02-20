import type {InputHTMLAttributes, SelectHTMLAttributes} from "@builder.io/qwik";
import {component$, Slot} from "@builder.io/qwik";
import {cn} from "~/app/utils";

export const SearchInput = component$(({class: className, ...props}: InputHTMLAttributes<any>) => {
    return (
        <input
            {...props}
            class={`border appearance-none py-2 transition-colors w-full rounded-md border-slate-200 outline-0 px-4 focus:border-primary-300 ${className ?? ""}`}
            type="search"
        />
    )
})

export const SelectInput = component$((props: SelectHTMLAttributes<any>) => {
    return (
        <select
            {...props}
            class={"border transition-colors py-2 w-full rounded-md border-slate-200 outline-0 px-3 focus:border-primary-300 mb-4" + (props.class ? (" " + props.class) : "")}
        >
            <Slot/>
        </select>
    )
})

export const TextInput = component$(({class: className, type, ...props}: InputHTMLAttributes<any>) => {
    return (
        <input
            class={cn(`border appearance-none py-2 transition-colors w-full rounded-md border-slate-200 outline-0 px-4 focus:border-primary-300`, className)}
            type={type || "text"}
            {...props}
        />
    )
})

export const InputLabel = component$(
    ({name, label}: { name: string, label: string }) => (
        <>
            {label && (
                <label
                    class={"inline-block text-sm mb-2"}
                    for={name}
                >
                    {label}{': '}
                </label>
            )}
        </>
    )
);
