import { DataTablePagination } from '@/app/components/admin/Pagination';
import Table from '@/app/components/admin/Table';
import { columns } from './ColumnDef';

export default async function Users({ searchParams }: { searchParams: { search?: string; page?: string } }) {

    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const users = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/admin/users/paginate?page=${page}&search=${search}`, {
        method: "GET",
        cache: "no-store",
    }).then(res => res.json())
        .catch(err => console.log(err));

    return (
        <div className='p-4 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Users</h1>
            </div>
            <Table columns={columns} tableData={users.data} initialSearch={search} />
            <DataTablePagination totalPages={users.meta.last_page} initialPage={page} />
        </div>
    );
}
