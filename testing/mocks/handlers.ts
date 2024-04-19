import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/todos/4', ({ request }) => {
    return HttpResponse.json({ id: 'this is route handlers component' })
  }),
]
