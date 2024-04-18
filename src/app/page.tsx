import ActionComponent from '@/components/action'
import ClientComponent from '@/components/client'
import RouteComponent from '@/components/route'
import ServerComponent from '@/components/server'

export default async function Home() {
  return (
    <>
      <ClientComponent />
      <ServerComponent />
      <ActionComponent />
      <RouteComponent />
    </>
  )
}
