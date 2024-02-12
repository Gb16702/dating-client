"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DataTablePagination({ totalPages, initialPage }: { totalPages: number, initialPage: number }) {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(initialPage);

    if (totalPages === 1) {
        return null
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page)
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(page));
        router.push(url.toString());
    }

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to first page</span>

                    </button>
                    <button
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                    </button>
                    <button
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                    </button>
                    <button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                    </button>
                </div>
            </div>
        </div>
    )
}