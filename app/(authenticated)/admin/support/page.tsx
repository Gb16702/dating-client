import { DataTablePagination } from '@/app/components/admin/Pagination';
import Table from '@/app/components/admin/Table';
import { columns } from './ColumnDef';
import Search from '@/app/components/admin/Search';

export default async function Hobbies({ searchParams }: { searchParams: { search?: string; page?: string } }) {

    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const tickets  = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/tickets/all?page=${page}&search=${search}`, {
        method: "GET",
        cache: "no-store",
    }).then(res => res.json())
        .catch(err => console.log(err));

    console.log(tickets)

    return (
        <div className='p-4 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Supports</h1>
            </div>
            <div className='flex justify-between py-4'>
                <Search initialSearch={search} />
            </div>
            <Table columns={columns} tableData={tickets.data} />
            <DataTablePagination totalPages={tickets.meta.last_page} initialPage={page} />
        </div>
    );
}
