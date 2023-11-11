import type {QwikIntrinsicElements} from "@builder.io/qwik";

export function IconParkElephant(props: QwikIntrinsicElements['svg'], key: string) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props} key={key}>
            <g fill="none">
                <path stroke={props.color} stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                      d="M16.7942 12C12.7417 11.1116 4 12.1925 4 21.7874V40H9.86912V33.7811H26.638V40H32.5071V28.8949C33.2058 28.3026 34.4075 33.0231 36.6994 34.2253C38.0521 34.9349 39.2147 35.3968 40.4724 35.1137C43.1948 34.5009 44.4969 32.715 43.8261 28.4507C42.5685 29.9313 38.7955 31.5429 38.3763 28.4507C38.3763 24.8798 38.3763 15.5687 38.3763 15.5687C37.957 12.9035 35.5255 7.66183 29.1534 8.01719H22.2842C19.3497 8 14.9898 12.0148 15.9959 17.3452C16.3082 19 17.5 22.3045 21.7035 22.6757C23.3804 22.8238 26.1534 22.1427 27.8302 18.2336"></path>
                <circle cx="33" cy="19" r="2" fill={props.color}></circle>
            </g>
        </svg>
    )
}