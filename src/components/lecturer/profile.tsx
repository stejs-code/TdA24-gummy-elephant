import {component$} from "@builder.io/qwik";
import {Image} from "@unpic/qwik";
export interface Profile {
    imageUrl: string,
    alt: string
}

export const Profile = component$<Profile>(({imageUrl, alt}) => {
    return (
        <>
            <div class={"relative h-[343px] sm:h-auto sm:aspect-square sm:w-[322px] overflow-hidden sm:overflow-visible"}>
                <div class={"absolute bottom-0 -translate-x-1/2 left-1/2 sm:translate-x-0 sm:left-0 flex justify-center overflow-hidden sm:block px-1 sm:w-[280px] sm:p-0"}>
                    <Image
                        class={"max-w-none pointer-events-none"}
                        src={"/images/drop.webp"}
                        // layout="constrained"
                        width={640}
                        height={280}
                        alt={alt}
                    />
                </div>
                <Image
                    class={"absolute sm:-translate-y-5 sm:static left-1/2 top-0 -translate-x-1/2 sm:translate-x-[42px] drop-shadow-lg"}
                    src={imageUrl}
                    loading={"eager"}
                    width={300}
                    height={300}
                    alt={alt}/>
            </div>
        </>
    );
});
