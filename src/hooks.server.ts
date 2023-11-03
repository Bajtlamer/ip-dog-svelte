import { dbConnect } from "$db/mongo";
// import { User, insertUser } from "$db/users";
import { handleUser } from "$lib/server/auth.service"
import { redirect, error } from "@sveltejs/kit";

// Connect to MongoDB before starting the server
dbConnect().then((): void => {
    console.log("MongoDB started");
}).catch((e) => {
    console.log("MongoDB failed to start");
});

export const handle = async ({ event, resolve }) => {
    const { cookies, url } = event
    const userToken = cookies.get("auth");

    if (event.url.pathname !== "/login" && event.url.pathname !== "/register") {

        try {
            const authUser = await handleUser(userToken);
            event.locals.user = authUser;
        } catch (err: any) {
            throw error(500, err?.message)
        }

        if (!event.locals.user) {
            if (!event.locals.user) {
                throw redirect(303, `/login?redirectTo=${url.pathname}`)
            }
        }
    }


    const response = await resolve(event)

    return response
}
