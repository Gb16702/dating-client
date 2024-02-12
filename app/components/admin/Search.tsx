'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Search({ initialSearch }: { initialSearch?: string }) {
    const router = useRouter();

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set("search", value);
        router.push(url.toString());
    }

    return (
        <input
            placeholder="Search..."
            className="max-w-sm dark:bg-secondary_dark dark:border-gray-400
                    flex h-10 w-full rounded-md border border-input bg-background px-3"
            value={initialSearch}
            onChange={handleFilterChange}
        />
    )
}
