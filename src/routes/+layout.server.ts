import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }:any) => {
	return {
		user: locals.user,
	}
}