type ChevronProps = {
    classes: string;
    width?: number
}


export default function Chevron({classes, width}: ChevronProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={width ?? 2}
             stroke="currentColor" className={classes}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
        </svg>
    );
}

export function ChevronRight({classes}: ChevronProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0  0  24  24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className={`${classes} lucide lucide-chevron-right`}>
            <path d="m9  18  6-6-6-6"/>
        </svg>
    );
}

export function ChevronLeft({classes}: ChevronProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className={`${classes} lucide lucide-chevron-left`}>
            <path d="m15 18-6-6 6-6"/>
        </svg>
    )
}

export function ChevronsLeft({classes}: ChevronProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className={`${classes} lucide lucide-chevrons-left`}>
            <path d="m11 17-5-5 5-5"/>
            <path d="m18 17-5-5 5-5"/>
        </svg>
    )
}

export function ChevronsRight({classes}: ChevronProps) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className={`${classes} lucide lucide-chevrons-right`}>
            <path d="m6 17 5-5-5-5"/>
            <path d="m13 17 5-5-5-5"/>
        </svg>
    )
}