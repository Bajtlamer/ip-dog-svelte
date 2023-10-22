import { authenticateUser } from "$lib/server/auth"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	// Stage 1
	event.locals.user = authenticateUser(event)

	if (event.url.pathname.startsWith("/servers")) {
		if (!event.locals.user) {
			throw redirect(303, "/")
		}
		if (event.url.pathname.startsWith("/admin")) {
			if (event.locals.user.role !== "ADMIN") {
				throw redirect(303, "/")
			}
		}
	}   

	const response = await resolve(event) // Stage 2

	// Stage 3

	return response
}