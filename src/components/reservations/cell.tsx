import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

interface Props {
    roundedb?:boolean,
    roundedt?:boolean,
    capped?:boolean,
    isCurrentDate?:boolean

}

export const Cell =  component$((props:Props) => {

    if (props.capped) {
        return(
            <Link href={"./lesson"}>
                <div>
                    <div class={`w-40  borer border-gray-200 border-2 px-2 py-1 flex items-center justify-between border-b-0 ${props.roundedb? "border-b-2 rounded-bl-lg rounded-br-lg" : ""} ${props.roundedt? "rounded-tl-lg rounded-tr-lg" : ""} `}>
                        <p class={`font-light text-sm text-gray-300 ${props.capped? "text-secondary-300" : ""}`}>{props.capped? "Zabrané" : "Volné"}</p>
                        <p class={"font-light text-sm text-gray-500"}>16 - 19</p>
                    </div>
                </div>
            </Link>
        )

    }
    else {
        return(
            <div>
                <div class={`w-40  borer border-gray-200 border-2 px-2 py-1 flex items-center justify-between border-b-0 ${props.roundedb? "border-b-2 rounded-bl-lg rounded-br-lg" : ""} ${props.roundedt? "rounded-tl-lg rounded-tr-lg" : ""} `}>
                    <p class={`font-light text-sm text-gray-300 ${props.capped? "text-secondary-300" : ""}`}>{props.capped? "Zabrané" : "Volné"}</p>
                    <p class={"font-light text-sm text-gray-500"}>16 - 19</p>
                </div>
            </div>
        )
    }
})