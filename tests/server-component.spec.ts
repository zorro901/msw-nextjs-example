import {
  http,
  HttpResponse,
  expect,
} from 'next/experimental/testmode/playwright/msw'
import { e2eTest } from '../testing/e2e-util'

e2eTest.use({
  mswHandlers: [
    http.get('https://jsonplaceholder.typicode.com/todos/2', () => {
      return HttpResponse.json({ id: 'this is server component' })
    }),
  ],
})

e2eTest('fetch component on msw v2', async ({ page, msw }) => {
  await page.goto('/server')

  await expect(page.locator('body')).toContainText('this is server component')
})
