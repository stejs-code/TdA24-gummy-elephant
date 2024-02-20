import {component$, Signal} from "@builder.io/qwik";
import {Cell} from "~/components/reservations/cell";

interface Props {
    day:string,
    isCurrentDay?:boolean,
    closeModal: Signal<boolean>,
}

export const Table =  component$((props:Props) => {

    return(
        <div class={`${props.isCurrentDay? "scale-110" : ""}`}>
            <div class={`mb-3 flex justify-center items-center ${props.isCurrentDay? "font-bold" : ""}`}><p>{props.day}</p></div>
            <Cell isCurrentDate={props.isCurrentDay} roundedt={true}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay} capped={true} closeModal={props.closeModal}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay} capped={true} closeModal={props.closeModal}></Cell>
            <Cell isCurrentDate={props.isCurrentDay}></Cell>
            <Cell isCurrentDate={props.isCurrentDay} roundedb={true}></Cell>

        </div>
    )
})