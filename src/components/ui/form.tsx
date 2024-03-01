import type {InputHTMLAttributes, SelectHTMLAttributes} from "@builder.io/qwik";
import {component$, Slot, useSignal} from "@builder.io/qwik";
import {cn} from "~/app/utils";
import {LuEye, LuEyeOff} from "@qwikest/icons/lucide";

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

export const TextInput = component$<InputHTMLAttributes<any> & {
    error?: string,
    label?: string,
    required?: boolean
}>((props) => {
    const {
        class: className,
        error,
        label,
        type,
        required,
        ...other
    } = props

    return (
        <>
            {label && <InputLabel required={required} label={label} name={props.name || ""}/>}
            <input
                class={cn(`border appearance-none py-2 transition-colors w-full rounded-md border-slate-200 outline-0 px-4 focus:border-primary-300`, className)}
                type={type || "text"}
                {...other}
            />
            <p class={"text-xs mt-1 text-red-500"}>
                {error || <span>&nbsp;</span>}
            </p>
        </>
    )
})

export const InputLabel = component$<{ name: string, label: string, required?: boolean }>(
    ({name, label, required}) => (
        <>
            {label && (
                <label
                    class={"inline-block text-sm mb-2"}
                    for={name}
                >
                    {label}{': '} {required && <span class={"text-red-600"}>*</span>}
                </label>
            )}
        </>
    )
);

export const PasswordInput = component$<InputHTMLAttributes<any> & {
    error?: string,
    label?: string,
    placeholder?: string,
    required?: boolean
}>((props) => {
    const {
        class: className,
        error,
        placeholder,
        label,
        required,
        ...other
    } = props

    const showPassword = useSignal(false)
    return (
        <div>
            {label && <InputLabel required={required} label={label} name={props.name || ""}/>}

            <div class={"flex items-center border border-gray-300 rounded py-2 px-4 w-full"}>
                <input
                    type={showPassword.value ? "text" : "password"}
                    name={"password"}
                    placeholder={placeholder}
                    autocomplete={"current-password"}
                    class={cn("bg-transparent focus:outline-none w-full", className)}
                    {...other}
                />
                {showPassword.value
                    ? <button type={"button"} onClick$={() => {showPassword.value = !showPassword.value}}><LuEye/></button>
                    : <button type={"button"} onClick$={() => {showPassword.value = !showPassword.value}}><LuEyeOff/></button>
                }
            </div>

            <p class={"text-xs mt-1 mb-2 text-red-500"}>
                {error || <span>&nbsp;</span>}
            </p>
        </div>
    )
})
