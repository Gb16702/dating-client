import { DataTablePagination } from '@/app/components/admin/Pagination';
import Search from '@/app/components/admin/Search';
import Table from '@/app/components/admin/Table';
import Link from 'next/link';
import { columns } from './ColumnDef';

type searchParamsProps = {
    search?: string
    page?: string | number
}

async function getCities({ search, page }: searchParamsProps) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}api/admin/cities/all?page=${page}&search=${search}`
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

    const cities = await getCities({ search, page });


    console.log(cities)

    return (
        <div className='p-4 space-y-4'>
            <h1 className='text-3xl'>Cities</h1>
            <div className='flex justify-between py-4'>
                <Search initialSearch={search} />
                <Link href='/admin/cities/create' className='btn bg-white rounded h-10 px-4 py-2 border border-input'>Add City</Link>
            </div>
            <Table columns={columns} tableData={cities.data} />
            <DataTablePagination totalPages={cities.meta.last_page} initialPage={page} />
        </div>
    );
}
