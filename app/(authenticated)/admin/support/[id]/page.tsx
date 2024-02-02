import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const id = typeof params.id === "string" ? params.id : undefined

    return (
        <div>

        </div>
    )
}
