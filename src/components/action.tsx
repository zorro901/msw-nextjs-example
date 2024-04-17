'use client'

import { serverActions } from '@/actions/example'
import { useEffect, useState } from 'react'

export default function ActionComponent() {
  const [id, setId] = useState('')

  useEffect(() => {
    async function fetchData() {
      setId(await serverActions())
    }
    fetchData()
  }, [])

  return <div>{id}</div>
}
