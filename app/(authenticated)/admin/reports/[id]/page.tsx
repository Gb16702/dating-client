import { notFound } from "next/navigation"

async function getReport({ id }: { id: string | undefined }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/admin/users/reports/${id}`)

    if (!response.ok) notFound()

    return response.json()
}

export default async function page({ params }: { params: { id: string } }) {
    const id = typeof params.id === "string" ? params.id : undefined

    const report = await getReport({ id })

    return (
        <div className='p-4 space-y-4'>
            <h1 className='text-3xl'>Report</h1>
            <p className='text-xl'>Reported: {report.reported_user_id}</p>
            <p className='text-xl'>Reporter: {report.reporter_user_id}</p>
            <p className='text-xl'>Description: {report.report_description}</p>
        </div>
    )
}
