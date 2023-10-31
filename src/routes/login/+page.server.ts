import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { authenticateUser } from "../../lib/server/auth.service"

export const actions: Actions = {
	login: async ({ cookies, request, url }: any) => {
		
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		await sleep(1000);
		const _authResponse = await authenticateUser(username, password);

		if (_authResponse?.auth === true) {
			const token = _authResponse.token;

			cookies.set("auth", token, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})

			throw redirect(302, url.searchParams.get('redirectTo') || '/');

		} else {
			return { username, password, ..._authResponse }
		}

	}
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));