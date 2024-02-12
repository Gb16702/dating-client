'use client'
import { useRouter } from "next/navigation";

export default function Filter({ initialFilter }: { initialFilter?: string }) {
    const router = useRouter();
    const options = ["admin", "banned"];

    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let value = e.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set("filter", value);
        router.push(url.toString());
    }

    return (
        <select
            value={initialFilter}
            className="w-32 dark:bg-secondary_dark dark:border-gray-400
            flex h-10 rounded-md border border-input bg-background px-3"
            onChange={handleFilterChange}
        >
            <option value="">All</option>
            {options.map((option) => (
                <option
                    className=""
                    key={option}
                    value={option}>
                    {option[0].toUpperCase() + option.slice(1).toLowerCase()}
                </option>
            ))}
        </select>
    )
}
