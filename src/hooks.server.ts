// import { authenticateUser } from "$lib/server/auth"
import { getUserInfo } from "$lib/server/auth.service"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event
	const userToken = cookies.get("auth") || '';

	if (event.url.pathname !== "/" && event.url.pathname !== "/login" && !event.locals.user) {
		if (!userToken) {
			throw redirect(303, "/")
		}
		
		const user = await getUserInfo(userToken);

		if(user){
			cookies.set('user', user);
		}else{
			cookies.delete('user');
			cookies.delete('auth');
		}
	}   

	const response = await resolve(event)

	return response
}