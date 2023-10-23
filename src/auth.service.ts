// import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

const url = 'https://ipdog-api.smes24.com/api/v1/login'

export const getUsernameAuthToken = async(username:string, password:string) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const data = await res.json();
    return data;
}



export const login = async(cookies:any) => {
	// login: async ({ cookies }:any) => {
		cookies.set("auth", "regularusertoken", {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 1 week
		})

		throw redirect(303, "/")
	// }
}