import {component$, Slot} from "@builder.io/qwik";

export interface Info {
    content: {
        text: string,
        href?: string
    }[],
}

export const Info = component$<Info>(({content}) => {
    return (
        <>
            <div class="flex mb-6">
                <span class={"mr-6"}>
                    <Slot/>
                </span>
                <ul>
                    {content.map((val, i) => (
                        <li key={i} class={"text-base not-italic mb-4"}>

                            {val.href
                            ? <a href={val.href} class={"underline py-2 hover:text-primary transition-colors"}>{val.text}</a>
                            : val.text}


                        </li>

                    ))}
                </ul>
            </div>
        </>
    );
});