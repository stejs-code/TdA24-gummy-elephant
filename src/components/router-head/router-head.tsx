import {component$} from "@builder.io/qwik";
import {useDocumentHead, useLocation} from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
    const head = useDocumentHead();
    const loc = useLocation();

    return (
        <>
            <title>{head.title}</title>

            <link rel="canonical" href={loc.url.href}/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""}/>
            <link href="https://fonts.googleapis.com/css2?family=Lalezar&family=Open+Sans:wght@400;600;700&display=swap"
                  rel="stylesheet"/>
            {head.meta.map((m) => (
                <meta key={m.key} {...m} />
            ))}

            {head.links.map((l) => (
                <link key={l.key} {...l} />
            ))}

            {head.styles.map((s) => (
                <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style}/>
            ))}
        </>
    );
});
