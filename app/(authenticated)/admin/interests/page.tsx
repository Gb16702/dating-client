import { DataTablePagination } from '@/app/components/admin/Pagination';
import Search from '@/app/components/admin/Search';
import Table from '@/app/components/admin/Table';
import Link from 'next/link';
import { columns } from './ColumnDef';

type searchParamsProps = {
    search?: string
    page?: string | number
}

async function getInterests({ search, page }: searchParamsProps) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}api/interests/admin?page=${page}&search=${search}`
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch hobbies");
    }

    return response.json();
}

export default async function Interest({ searchParams }: { searchParams: searchParamsProps }) {
    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const hobbies = await getInterests({ search, page });

    return (
        <div className='p-4 space-y-4'>
            <h1 className='text-3xl'>Interests</h1>
            <div className='flex py-4 justify-between'>
                <Search initialSearch={search} />
                <Link href='/admin/interests/create' className='btn bg-white rounded h-10 px-4 py-2 border border-input'>Add Hobby</Link>
            </div>
            <Table columns={columns} tableData={hobbies.data} />
            <DataTablePagination totalPages={hobbies.meta.last_page} initialPage={page} />
        </div>
    );
}
