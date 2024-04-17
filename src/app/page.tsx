import ActionComponent from '@/components/action'
import ClientComponent from '@/components/client'
import ServerComponent from '@/components/server'

export default async function Home() {
  return (
    <>
      <ClientComponent />
      <ServerComponent />
      <ActionComponent />
    </>
  )
}
