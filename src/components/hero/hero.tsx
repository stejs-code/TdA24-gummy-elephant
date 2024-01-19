import {component$} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {Link} from "@builder.io/qwik-city";


export interface Props{

}

export const Hero = component$(() => {


    return(
        <>
            <div class={"font-body -mt-24 sm:-mt-12 mb-10 py-20"}>
                <div class={"w-full max-w-4xl m-auto pb-4 flex max-lg:ml-10 "}>
                    <div class={"pt-32"}>
                        <div>
                            <div class={"z-20 relative"}>
                                <h1 class={"text-5xl font-bold w-1/2 lg:w-full mb-10 "}>Vzdělávat se s námi je hračka</h1>
                            </div>
                            <div class="w-96 absolute top-44 z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1800" fill="#f0fafb">
                                    <path d="M1386.57 181.4c160.9 73.74 328.5 149.72 424.59 281.57 96.09 129.61 118.44 315.09 98.33 487.16-20.11 172.07-84.92 332.97-187.71 446.94-105.03 116.2-250.29 185.48-391.07 243.58-138.55 60.34-272.63 109.5-393.31 91.62-122.91-17.88-234.64-102.8-377.66-160.9-143.02-58.1-317.33-87.15-406.71-183.24-89.39-96.09-96.09-261.46 2.23-368.72 98.33-109.5 301.68-160.9 384.37-270.4 82.68-111.73 42.46-283.81 84.92-422.36C669.24 188.1 798.86 80.83 937.41 60.72c140.79-20.11 290.51 49.16 449.17 120.67Z"></path>
                                </svg>
                            </div>
                        </div>
                        <Link href={"#scroll"} class={"relative z-20 bg-primary-400 text-white rounded-xl px-12 py-3 font-bold"}>
                            Najít lektora
                        </Link>
                    </div>
                    <div class={"relative w-full hidden md:block"}>
                        <div class={"w-2/3 absolute right-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" fill="#72c7d3">
                                <path d="M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z"></path>
                            </svg>
                        </div>
                        <div class={"w-2/3 absolute top-48 -right-16"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1800" fill="#b8e4e9">
                                <path d="M70.93 687.44C94 439 234.2 293.95 381.02 188.24 527.84 82.53 887.27-.87 1159.77 82.53c272.5 83.4 553.55 115.11 673.78 302.45 120.23 187.35 114.36 417.56 87.35 671.27-27.02 253.71-150.35 364.12-335.93 543.83-185.58 179.71-590.81 176.19-973.73 106.89C228.33 1637.67 257 1468 149.63 1259.45c-91.86-178.42-96.18-383.72-78.7-572.02Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
})