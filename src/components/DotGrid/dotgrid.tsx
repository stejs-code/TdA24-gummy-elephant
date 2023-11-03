import {component$} from '@builder.io/qwik';

export interface DotGridProps {
    width: number,
    height: number,
    amount: number,
    radius: number,
    fill: string
}

export const DotGrid = component$<DotGridProps>(({width, height, radius, amount, fill}) => {
    const gap = (width - 3 * radius) / (amount - 1)
    const rows = amount
    const columns = Math.floor((height - radius) / gap) + 1

    return (
        <>
            <svg width={width} height={height}>
                {(new Array(columns)).fill("").map((_, index1) => (
                    (new Array(rows)).fill("").map((_, index2) => (
                        <circle
                            key={`${index1}-${index2}`}
                            cx={radius + index2 * gap}
                            cy={radius + index1 * gap}
                            r={radius} fill={fill}/>
                    ))
                ))}
            </svg>
        </>
    );
});
