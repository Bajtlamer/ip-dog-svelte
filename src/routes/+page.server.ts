import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { getUsernameAuthToken } from "../auth.service"
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ cookies, request }:any) => {

		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const userToken = await getUsernameAuthToken(username, password)

		console.log(userToken)
		// if(userToken.auth === false){
		// 	throw error(404, {
		// 		message: userToken.message
		// 	});
		// }
		return fail(500, { message: 'Could not create the score.' });
		// return { name: data.get('username'), success: data.get('username') !== '' };
		// return false
		// cookies.set("auth", "regularusertoken", {
		// 	path: "/",
		// 	httpOnly: true,
		// 	sameSite: "strict",
		// 	secure: process.env.NODE_ENV === "production",
		// 	maxAge: 60 * 60 * 24 * 7, // 1 week
		// })

		throw redirect(303, "/")
	}
}