import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ cookies }:any) => {
	const token = cookies.get('auth');
	const user = cookies.get('user');

	return {
		user,
		token
	}
}