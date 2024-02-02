import { DataTablePagination } from '@/app/components/admin/Pagination';
import Table from '@/app/components/admin/Table';
import { columns } from './ColumnDef';

export default async function Hobbies({ searchParams }: { searchParams: { search?: string; page?: string } }) {

    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const reports = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/admin/users/reports/all`, {
        method: "GET",
        cache: "no-store",
    }).then(res => res.json())
    .catch(err => console.log(err));


    return (
        <div className='p-4 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Reports</h1>
            </div>
            <Table columns={columns} tableData={reports.data} initialSearch={search} />
            <DataTablePagination totalPages={reports.meta.last_page} initialPage={page} />
        </div>
    );
}
