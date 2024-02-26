import {component$, Signal} from "@builder.io/qwik";

interface Props {
    redirect:string,
    content:string,
}

export const ChangeView =  component$((props:Props) => {

    return(
        <a href={props.redirect} class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem"
           tabIndex={-1} id="menu-item-0">{props.content}</a>
    )
})