// import { authenticateUser } from "$lib/server/auth"
import { getUserInfo } from "$lib/server/auth.service"
import { redirect } from "@sveltejs/kit";
// import { type Handle } from "@sveltejs/kit"

export const handle = async ({ event, resolve }) => {
    const { cookies, url } = event
    const userToken = cookies.get("auth");

    //@TODO SETUP TOKEN VERIFICATION

    if (userToken) {
        const authUser = await getUserInfo(userToken);
        event.locals.user = authUser;
    } else {
        event.locals.user = null;
    }

    if (event.url.pathname !== "/" && event.url.pathname !== "/login" && !event.locals.user) {
        if (!userToken) {
            throw redirect(303, `/login?redirectTo=${url.pathname}`)
        }
    }

    const response = await resolve(event)

    return response
}