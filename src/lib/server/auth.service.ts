// import type { Actions, PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
// import type { RequestEvent } from "../../routes/$types";

const url = 'https://ipdog-api.smes24.com/api/v1/'

export const authenticateUser = async(username: string, password: string) => {
    const res = await fetch(url + 'login', {
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

    if(res.ok === true) {
        return await res.json();
    }

    const data = await res.json();
    
    // const user = await getUserInfo(data.userToken);
    return data;
}

export const getUserInfo = async (userToken: string) => {
    const res = await fetch(url + 'profile', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        }
    });
    
    if(res.ok === true) {
        return await res.json();
    }
    
    return null;
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