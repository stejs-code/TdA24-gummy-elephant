import {component$} from "@builder.io/qwik";

export interface Badge {
    content: string,
}

export const Badge = component$<Badge>(({content}) => {
    return (
        <>
            <span class="mr-2 mb-1 sm:text-blueCustom text-center text-sm not-italic sm:font-semibold rounded-md border border-solid border-blueCustom sm:py-1.5 sm:px-2.5 py-2 px-3 bg-blueCustom sm:bg-[#FFF] text-[#FFF]">{content}</span>
        </>
    );
});