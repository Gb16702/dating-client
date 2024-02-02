
export default async function page({ params }: { params: { id: string } }) {
    const id = typeof params.id === "string" ? params.id : undefined
    const report = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/users/reports/${id}`, {
        method: "GET",
        cache: "no-store",
    }).then(res => res.json())


    return (
        <div className='p-4 space-y-4'>
            <h1 className='text-3xl'>Report</h1>
            <pre>{JSON.stringify(report, null, 2)}</pre>
            <p className='text-xl'>Reported: {report.reported_user_id}</p>
            <p className='text-xl'>Reporter: {report.reporter_user_id}</p>
            <p className='text-xl'>Description: {report.report_description}</p>
        </div>
    )
}
