import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";
import {Info} from "~/components/lecturer/info";
import {routeLoader$} from "@builder.io/qwik-city";
import {IoCallOutline, IoCashOutline, IoMailOutline, IoMapOutline} from "@qwikest/icons/ionicons";

export default component$(() => {
    const document = useDocument()


    return (
        <>
            <div class={"max-w-7xl sm:flex sm:flex-col md:mx-8 lg:mt-5 lg:flex-row sm:justify-center lg:mx-auto"}>
                {document.value.picture_url &&
                    <div class={"sm:mx-auto lg:mx-10"}>
                        <Profile
                            imageUrl={document.value.picture_url}
                            alt={document.value.name}/>

                    </div>
                }
                <div class="flex flex-col pt-8 lg:pt-4 px-6 w-full lg:ml-4">
                    <div class={""}>
                        <h1 class="text-default text-5xl font-display">{document.value.name}</h1>
                        {document.value.claim &&
                            <h2 class="text-default mt-4 text-xl font-normal">{document.value.claim}</h2>
                        }
                    </div>
                    <div class="mt-10 flex sm:max-w-sm flex-wrap">
                        <div class={"mr-14"}>
                            <Info content={document.value.contact.telephone_numbers.map(i => ({
                                text: i,
                                href: `tel:${i.replaceAll(" ", "")}`
                            }))}>
                                <IoCallOutline class={"text-primary"} style={{fontSize: "28px"}}/>
                            </Info>

                            <Info content={document.value.contact.emails.map(i => ({
                                text: i,
                                href: `mailto:${i}`
                            }))}>
                                <IoMailOutline class={"text-primary"} style={{fontSize: "28px"}}/>
                            </Info>
                            {/*<LongInfo*/}
                            {/*    icon={"#"}*/}
                            {/*    content={'placha@scg.cz'}*/}
                            {/*    secContent={'predseda@scg.cz'}/>*/}

                        </div>
                        <div>

                            <Info content={[{text: document.value.location}]}>
                                <IoMapOutline class={"text-primary"} style={{fontSize: "28px"}}/>
                            </Info>

                            <Info content={[{text: `${document.value.price_per_hour} Kč/h`}]}>
                                <IoCashOutline class={"text-primary"} style={{fontSize: "28px"}}/>
                            </Info>
                            {/*<Info*/}
                            {/*    icon={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}*/}
                            {/*    content={"Brno"}/>*/}
                            {/*<Info*/}
                            {/*    icon={"https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"}*/}
                            {/*    content={"1200 Kč/h"}/>*/}
                        </div>
                    </div>
                    <div class="mt-5 text-default text-s font-normal max-w-3xl "
                         dangerouslySetInnerHTML={document.value.bio}>
                    </div>
                    <ul class={"sm:mt-10 mt-5 flex flex-wrap content-center"}>
                        {document.value.tags.map((tag, i) => (
                            // <Badge key={i} content={tag.name}/>
                            // <li class={"mr-4 mb-0.5"} key={i}>#{tag.name}</li>
                            <li class={"mr-2 text-slate-800 mb-2 px-4 text-sm py-1 bg-slate-100 rounded-lg"} key={i}>#{tag.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
});
