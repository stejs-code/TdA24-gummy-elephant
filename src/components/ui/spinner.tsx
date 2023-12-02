import {component$} from "@builder.io/qwik";

export const Spinner = component$(() => {
    return (
        <span class={"uk-spinner"}>
            <svg width="40" height="40" viewBox="0 0 30 30">
                <circle fill="none" stroke="#000" cx="15" cy="15" r="14" style="stroke-width: 0.222222px;"></circle>
            </svg>
        </span>
    )
})