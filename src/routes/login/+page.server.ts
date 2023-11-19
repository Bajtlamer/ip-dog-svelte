import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { authenticateUser } from "../../lib/server/auth.service"
import { signing } from "../../store/loader";
import { addUser } from "$db/sqllite/user";
import { User, type UserInterface } from "../../models/user";

export const actions: Actions = {
	login: async ({ cookies, request, url }: any) => {
		
		const data = await request.formData();
		const email = data.get('username');
		const password = data.get('password');

		await sleep(1000);
		const _authResponse = await authenticateUser(email, password);

		if (_authResponse?.auth === true) {
			const token = _authResponse.token;
			const _addedUser = await addUser(new User({email, password, isActive:true, isAdmin:false, fullname:'Radek Roža'}));
			
			console.log('addedUser:',_addedUser);

			cookies.set("auth", token, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})

			throw redirect(302, url.searchParams.get('redirectTo') || '/');

		} else {
			signing.set(false);
			return { email, password, ..._authResponse }
		}

	}
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));