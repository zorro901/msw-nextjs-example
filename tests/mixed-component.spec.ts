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
    http.get('https://jsonplaceholder.typicode.com/todos/2', () => {
      return HttpResponse.json({ id: 'this is server component' })
    }),
    http.get('https://jsonplaceholder.typicode.com/todos/3', () => {
      return HttpResponse.json({ id: 'this is server actions component' })
    }),
  ],
})

e2eTest('client and server components render', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('body')).toContainText('this is client component')
  await expect(page.locator('body')).toContainText('this is server component')
  await expect(page.locator('body')).toContainText(
    'this is server actions component',
  )
})
