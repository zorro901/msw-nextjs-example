export async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/4')
  const data = (await response.json()) as { id: string }
  return Response.json(data)
}
