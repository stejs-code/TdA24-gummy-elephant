import type {AnchorHTMLAttributes, ButtonHTMLAttributes} from "@builder.io/qwik";
import {component$, Slot} from "@builder.io/qwik";

export const PrimaryButton = component$((props: ButtonHTMLAttributes<any>) => {
    return <button
        {...({
            ...props,
            class: "px-6 py-2 bg-primary-300 text-white rounded-md transition-colors hover:bg-primary-400 focus:bg-primary-500 " + props.class
        })}
    >
        <Slot/>
    </button>
})


export const DefaultButton = component$((props: ButtonHTMLAttributes<any>) => {
    return <button
        {...({
            ...props,
            class: "px-6 py-2 bg-slate-100 rounded-md transition-colors hover:bg-slate-200 focus:bg-slate-300 " + props.class
        })}
    >
        <Slot/>
    </button>
})


export const PrimaryButtonLink = component$((props: AnchorHTMLAttributes<any>) => {
    return <a
        {...({
            ...props,
            class: "px-6 py-2 bg-primary-300 text-white rounded-md transition-colors hover:bg-primary-400 focus:bg-primary-500 " + props.class
        })}
    >
        <Slot/>
    </a>
})