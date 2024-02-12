import React from 'react'
import Form from '../Form'
import { notFound } from 'next/navigation';

async function getHobbyById(id: string | undefined) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/interests/${id}`)

  if (!response.ok) notFound()

  return response.json()
}

export default async function EditHobby({ params }: { params: { id: string } }) {
  const id = typeof params.id === "string" ? params.id : undefined

  const { interest } = await getHobbyById(id)

  return (
    <section className="w-full ">
      <h1 className='text-3xl mb-4'>Update {interest.name}</h1>
      <Form value={interest} />
    </section>
  )
}
