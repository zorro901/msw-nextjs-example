import {
  http,
  HttpResponse,
  expect,
} from 'next/experimental/testmode/playwright/msw'
import { e2eTest } from '../testing/e2e-util'

e2eTest.use({
  mswHandlers: [
    http.get('https://jsonplaceholder.typicode.com/todos/1', () => {
      return HttpResponse.json({ id: 'this is client component' })
    }),
  ],
})

e2eTest('fetch component on msw v2', async ({ page }) => {
  await page.goto('/client')

  await expect(page.locator('body')).toContainText('this is client component')
})
