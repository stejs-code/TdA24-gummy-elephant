import {component$} from "@builder.io/qwik";

export interface LongInfo {
    icon: string,
    content: string,
    secContent: string,
}

export const LongInfo = component$<LongInfo>(({icon, content}) => {
    return (
        <>
            <div class="flex items-center">
                <a href={icon} class="w-6 h-6 bg-gray-400 mr-2"></a> {/*ICONS-not added yet*/}
                <div class={"flex-col"}>
                    <p class="text-yellowCustom text-base not-italic font-semibold">{content}</p>
                    <p class={"text-yellowCustom text-base not-italic font-semibold"}>{content}</p>
                </div>
            </div>
        </>
    );
});