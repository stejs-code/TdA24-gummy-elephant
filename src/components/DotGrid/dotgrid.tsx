import {component$} from '@builder.io/qwik';

export interface DotGridProps {
    size: number,
    amount: number,
    radius: number,
    fill: string
}

export const DotGrid = component$<DotGridProps>(({size, radius, amount, fill}) => {
    const gap = (size - 3 * radius) / (amount - 1)

    return (
        <>
            <svg width={size} height={size}>
                {(new Array(amount)).fill("").map((_, index1) => (
                    (new Array(amount)).fill("").map((_, index2) => (
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
