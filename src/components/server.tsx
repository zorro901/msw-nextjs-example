export default async function ServerComponent() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/2')
  const data = (await response.json()) as { id: string }

  return <div>{data.id}</div>
}
