import {redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { authenticateUser, getUserInfo } from "../../lib/server/auth.service"
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies, request, url }:any) => {

		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		let token = '';

		try {
			// const response = await getUsernameAuthToken('bajtlamer@gmail.com', 'printadmin')
			const response = await authenticateUser(username, password)
			
			if(response?.auth === true){
				token = response.token;
				
				const user = await getUserInfo(token);

				if(user){
					cookies.set("user", user, {
						path: "/",
						httpOnly: true,
						sameSite: "strict",
						secure: process.env.NODE_ENV === "production",
						maxAge: 60 * 60 * 24 * 7, // 1 week
					})
	
				}

				cookies.set("auth", token, {
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV === "production",
					maxAge: 60 * 60 * 24 * 7, // 1 week
				})
				
				// throw redirect(303, url.searchParams('redirectTo') || '/');

				if (url.searchParams.has('redirectTo')) {
					throw redirect(303, url.searchParams.get('redirectTo'));
				}
				// console.log("Success", response)
				
			}else{
				// console.log("Login error:", response)
				return {username, password, ...response}
				// throw error(401, response?.message)
			}
	
			// console.log(userToken)
		} catch (error) {

			console.log("Login error:", error)
		}

		// if(userToken.auth === false){
		// 	throw error(404, {
		// 		message: userToken.message
		// 	});
		// }
		// return fail(500, { message: 'Could not create the score.' });
		// return { name: data.get('username'), success: data.get('username') !== '' };
		// return false
		// cookies.set("auth", "regularusertoken", {
		// 	path: "/",
		// 	httpOnly: true,
		// 	sameSite: "strict",
		// 	secure: process.env.NODE_ENV === "production",
		// 	maxAge: 60 * 60 * 24 * 7, // 1 week
		// })
		// return {test:"test"}

	}
}