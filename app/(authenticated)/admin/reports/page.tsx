import { DataTablePagination } from '@/app/components/admin/Pagination';
import Search from '@/app/components/admin/Search';
import Table from '@/app/components/admin/Table';
import { columns } from './ColumnDef';

type searchParamsProps = {
    search?: string
    page?: string | number
}

async function getReports({ search, page }: searchParamsProps) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}api/admin/users/reports/all?page=${page}&search=${search}`
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch reports");
    }

    return response.json();
}

export default async function Hobbies({ searchParams }: { searchParams: { search?: string; page?: string } }) {

    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const reports = await getReports({ search, page });

    return (
        <div className='p-4 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Reports</h1>
            </div>
            <div className='flex justify-between py-4'>
                <Search initialSearch={search} />
            </div>
            <Table columns={columns} tableData={reports.data} />
            <DataTablePagination totalPages={reports.meta.last_page} initialPage={page} />
        </div>
    );
}
