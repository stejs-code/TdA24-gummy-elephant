import {DotGrid} from "~/components/DotGrid/dotgrid";
import {component$} from "@builder.io/qwik";

export interface Profile {
    imageUrl: string,
    alt: string
}

export const Profile = component$<Profile>(({imageUrl, alt}) => {
    return (
        <>
            <div class={"relative h-[313px] sm:h-auto sm:aspect-square sm:w-[322px] overflow-hidden sm:overflow-visible"}>
                <div class={"absolute bottom-0 -translate-x-1/2 left-1/2 sm:translate-x-0 sm:left-0 flex justify-center overflow-hidden sm:block px-1 sm:w-[280px] sm:p-0"}>
                    <DotGrid amount={45} height={280} width={640} radius={2} fill={"#74C7D3"}/>
                </div>
                <img
                    class={"absolute sm:translate-y-2 sm:static left-1/2 top-0 -translate-x-1/2 sm:translate-x-[42px] drop-shadow-lg"}
                    src={imageUrl}
                    loading={"eager"}
                    width={270}
                    height={270}
                    alt={alt}/>
            </div>
        </>
    );
});
