import {DotGrid} from "~/components/DotGrid/dotgrid";
import {component$} from "@builder.io/qwik";

export interface Info {
    icon: string,
    content: string,
}

export const Info = component$<Info>(({icon, content}) => {
    return (
        <>
            <div class="flex items-center mb-7 sm:mb-0">
                <i class="w-6 h-6 bg-gray-400 mr-2"></i> {/*ICONS-not added yet*/}
                <p class="text-yellowCustom text-base not-italic font-semibold">{content}</p>
            </div>
        </>
    );
});