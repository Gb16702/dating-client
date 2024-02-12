import { DataTablePagination } from '@/app/components/admin/Pagination';
import Table from '@/app/components/admin/Table';
import { columns } from './ColumnDef';
import Filter from './Filter';
import Search from '@/app/components/admin/Search';

type searchParamsProps = {
    search?: string
    page?: string | number
    filter?: string
}

async function getUsers({ search, page, filter }: searchParamsProps) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}api/admin/users/paginate?page=${page}&search=${search}&filter=${filter}`
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}

export default async function Users({ searchParams }: { searchParams: searchParamsProps }) {
    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
    const filter = typeof searchParams.filter === "string" ? searchParams.filter : undefined;

    const users = await getUsers({ search, page, filter });

    return (
        <div className='p-4 space-y-4'>
            <h1 className='text-3xl'>Users</h1>
            <div className='flex justify-between py-4'>
                <Search initialSearch={search} />
                <Filter initialFilter={filter} />
            </div>
            <Table columns={columns} tableData={users.data} />
            <DataTablePagination totalPages={users.meta.last_page} initialPage={page} />
        </div>
    );
}
