import {
	type LifeCycleEventsMap,
	type RequestHandler,
	handleRequest,
} from 'msw'
import { test as base } from 'next/experimental/testmode/playwright'
import { Emitter } from 'strict-event-emitter'

export type MswFixture = {
	use: (...handlers: RequestHandler[]) => void
}
export const e2eTest = base.extend<{
	msw: MswFixture
	mswHandlers: RequestHandler[]
}>({
	mswHandlers: [[], { option: true }],
	msw: [
		async ({ next, mswHandlers }, use) => {
			const handlers: RequestHandler[] = [...mswHandlers]
			const emitter = new Emitter<LifeCycleEventsMap>()

			next.onFetch(async (request) => {
				let isUnhandled = false
				let isPassthrough = false
				let mockedResponse: Response | null = null

				await handleRequest(
					request,
					Math.random().toString(16).slice(2),
					handlers,
					{
						onUnhandledRequest: () => {
							isUnhandled = true
						},
					},
					emitter,
					{
						onPassthroughResponse: () => {
							isPassthrough = true
						},
						onMockedResponse: (r) => {
							mockedResponse = r
						},
					},
				)

				if (isUnhandled) {
					return undefined
				}
				if (isPassthrough) {
					return 'continue'
				}
				if (mockedResponse) {
					return mockedResponse
				}

				return 'abort'
			})

			await use({
				use: (...newHandlers) => {
					handlers.unshift(...newHandlers)
				},
			})

			handlers.length = 0
		},
		{ auto: true },
	],
})
