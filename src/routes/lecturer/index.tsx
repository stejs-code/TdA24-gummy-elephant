import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import {Profile} from "~/components/lecturer/profile";
import {Info} from "~/components/lecturer/info";
import {IoCallOutline, IoCashOutline, IoMailOutline, IoMapOutline} from "@qwikest/icons/ionicons";

export default component$(() => {
    const document = useDocument()


    return (
        <div class={"mt-20"}>
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
                                <IoCallOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>

                            <Info content={document.value.contact.emails.map(i => ({
                                text: i,
                                href: `mailto:${i}`
                            }))}>
                                <IoMailOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>
                            {/*<LongInfo*/}
                            {/*    icon={"#"}*/}
                            {/*    content={'placha@scg.cz'}*/}
                            {/*    secContent={'predseda@scg.cz'}/>*/}

                        </div>
                        <div>

                            <Info content={[{text: document.value.location}]}>
                                <IoMapOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
                            </Info>

                            <Info content={[{text: `${document.value.price_per_hour} Kč/h`}]}>
                                <IoCashOutline class={"text-primary-300"} style={{fontSize: "28px"}}/>
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
                            <li class={"mr-2 text-slate-800 mb-2 px-4 text-sm py-1 bg-slate-100 rounded-lg"}
                                key={i}>#{tag.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});

export const useDocument = routeLoader$(() => {
    return {
        "UUID": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
        "title_before": "Mgr.",
        "first_name": "Petra",
        "middle_name": "Swil",
        "last_name": "Plachá",
        "title_after": "MBA",
        "name": "Mgr. Petra Swill Plachá MBA",
        "picture_url": "https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp",
        "location": "Brno",
        "claim": "Aktivní studentka / Předsedkyně spolku / Projektová manažerka",
        "bio": "<p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, <b>Tour de App</b> a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>",
        "tags": [
            {
                "uuid": "6d348a49-d16f-4524-86ac-132dd829b429",
                "name": "Dobrovolnictví"
            },
            {
                "uuid": "8e0568c3-e235-42aa-9eaa-713a2545ff5b",
                "name": "Studentské spolky"
            },
            {
                "uuid": "996c16c8-4715-4de6-9dd0-ea010b3f64c7",
                "name": "Efektivní učení"
            },
            {
                "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
                "name": "Prezentační dovednosti"
            },
            {
                "uuid": "824cfe88-8a70-4ffb-bcb8-d45670226207",
                "name": "Marketing pro neziskové studentské projekty"
            },
            {
                "uuid": "fa23bea1-489f-4cb2-b64c-7b3cd7079951",
                "name": "Mimoškolní aktivity"
            },
            {
                "uuid": "8325cacc-1a1f-4233-845e-f24acfd0287b",
                "name": "Projektový management, event management"
            },
            {
                "uuid": "ba65a665-e141-40ab-bbd2-f4b1f2b01e42",
                "name": "Fundraising pro neziskové studentské projekty"
            }
        ],
        "price_per_hour": 1200,
        "contact": {
            "telephone_numbers": ["+420 722 482 974"],
            "emails": ["placha@scg.cz", "predseda@scg.cz"]
        }
    }
})

export const head: DocumentHead = ({resolveValue}) => {
    const document = resolveValue(useDocument)
    return {
        title: document.name,
        meta: [
            {
                name: "keywords",
                content: document.claim.split(" / ").join(", ") + ", " + document.tags.map(i => i.name).join(", ")
            },
            {
                name: "description",
                content: document.claim
            }
        ]
    }
}