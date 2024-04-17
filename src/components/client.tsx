'use client'

import { useEffect, useState } from 'react'

export default function ClientComponent() {
  const [id, setId] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
      )
      const data = (await response.json()) as { id: string }
      setId(data.id)
    }
    fetchData()
  }, [])

  return <div>{id}</div>
}
