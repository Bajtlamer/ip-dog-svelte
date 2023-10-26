import { getUserInfo, revalidateToken } from "$lib/server/auth.service"
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const { cookies, url } = event
    const userToken = cookies.get("auth");

    if (userToken) {
        const claim = await revalidateToken(userToken);
        const validToken = claim?.auth;

        if(validToken === true){
            const authUser = await getUserInfo(userToken);
            if(authUser) event.locals.user = authUser;
        }else{
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    if (event.url.pathname !== "/" && event.url.pathname !== "/login" && !event.locals.user) {
        if (!event.locals.user) {
            throw redirect(303, `/login?redirectTo=${url.pathname}`)
        }
    }

    const response = await resolve(event)

    return response
}