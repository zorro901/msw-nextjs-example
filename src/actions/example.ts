'use server'

export const serverActions = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/3')
  const data = (await response.json()) as { id: string }
  return data.id
}
