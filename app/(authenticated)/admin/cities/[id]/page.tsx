import { notFound } from 'next/navigation'
import Form from '../Form'

async function getHobbyById(id: string | undefined) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/admin/cities/${id}`)

  if (!response.ok) notFound()

  return response.json()
}

export default async function EditCity({ params }: { params: { id: string } }) {
  const id = typeof params.id === "string" ? params.id : undefined

  const { city } = await getHobbyById(id)

  console.log(city)

  return (
    <section className="w-full ">
      <h1 className='text-3xl mb-4'>Update {city.name}</h1>
      <Form value={city} />
    </section>
  )
}
