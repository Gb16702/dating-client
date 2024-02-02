import { DataTablePagination } from '@/app/components/admin/Pagination';
import Table from '@/app/components/admin/Table';
import Link from 'next/link';
import { columns } from './ColumnDef';

export default async function Interest({ searchParams }: { searchParams: { search?: string; page?: string } }) {

    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const hobbies = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/interests/all?page=${page}&search=${search}`, {
        method: "GET",
        cache: "no-store",
    }).then(res => res.json())
        .catch(err => console.log(err));

    return (
        <div className='p-4 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Hobbies</h1>
                <Link href='/admin/interests/create' className='btn bg-white rounded h-10 px-4 py-2 border border-input'>Add Hobby</Link>
            </div>
            <Table columns={columns} tableData={hobbies.data} initialSearch={search} />
            <DataTablePagination totalPages={hobbies.meta.last_page} initialPage={page} />
        </div>
    );
}
