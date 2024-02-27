import {component$, Slot} from "@builder.io/qwik";

export interface Info {
    content: {
        text: string,
        href?: string
    }[],
    class?: string
}

export const Info = component$<Info>((props) => {
    return (
        <>
            <div class={"flex mb-6" + (props.class ? " " + props.class : "")}>
                <span class={"mr-6"}>
                    <Slot/>
                </span>
                <ul>
                    {props.content.map((val, i, array) => (
                        <li key={i} class={"text-base not-italic" + (array.length === (i + 1) ? "" : " mb-4")}>
                            {val.href
                                ? <a href={val.href}
                                     class={"underline py-2 hover:text-primary-300 transition-colors"}>{val.text}</a>
                                : val.text}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});
