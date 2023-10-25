import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ cookies, locals }:any) => {
	const token = cookies.get('auth');
	return {
		user: locals.user,
		token
	}
}