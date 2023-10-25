import { json, error } from '@sveltejs/kit';
// import { redirect } from "@sveltejs/kit"
import { getUsernameAuthToken } from '../../../lib/server/auth.service.js';

interface AuthResponse {auth: boolean, message: string, token?: string}

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
	const credentials = await request.json();
    let token:string|undefined = "";
    let _response: AuthResponse;

    const username = credentials?.username;
    const password = credentials?.password;

    _response = await getUsernameAuthToken(username, password);
    // return json(_response)
    if(_response?.auth === true) {
        token = _response.token;
        return json(_response)

	// cookies.set("auth", "regularusertoken", {
	// 		path: "/",
	// 		httpOnly: true,
	// 		sameSite: "strict",
	// 		secure: process.env.NODE_ENV === "production",
	// 		maxAge: 60 * 60 * 24 * 7, // 1 week
	// 	})

        // throw redirect(303, "/")
        // console.log(credentials);
        // }else{
            //     res = {auth:false, message:"Empty credentials!"}
    }else{
         console.log(_response);
        throw error(401, _response)
        // return response;
    }
    // console.log(response)
}