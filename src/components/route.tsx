export default async function RouteComponent() {
  const response = await fetch('http://localhost:3000/api/handlers')
  const data = (await response.json()) as { id: string }
  return <div>{data.id}</div>
}
