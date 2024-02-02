"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "../Icons/Chevron";

// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

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
            <div className="flex-1 text-sm text-muted-foreground">
                {/* {table.getFilteredSelectedRowModel().rows.length} of {" "}
                {table.getFilteredRowModel().rows.length} row(s) selected. */}
            </div>
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

                        {/* <ChevronsLeft className="h-4 w-4" /> */}
                    </button>
                    <button
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </button>
                    <button
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </button>
                    <button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        {/* <ChevronsRight className="h-4 w-4" /> */}
                    </button>
                </div>
            </div>
        </div>
    )
}