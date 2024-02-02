import React from 'react'
import Form from '../Form'

export default async function EditHobby({ params }: { params: { id: string } }) {

  const id = typeof params.id === "string" ? params.id : undefined

  const { interest } = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/interests/${id}`, {
    method: "GET",
    cache: "no-store",
  }).then(res => res.json())

  return (
    <section className="w-full ">
      <h1 className='text-3xl mb-4'>Update {interest.name}</h1>
      <Form value={interest} />
    </section>
  )
}
