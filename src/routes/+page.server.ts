import type { Actions, PageServerLoad } from "./$types"

export const actions: Actions = {
	default: async () => {
		// const data = await request.formData();
	}
}

export const load: PageServerLoad = async ({ cookies }:any) => {
	const token = cookies.get('auth');
	const user = cookies.get('user');

	return {
		user,
		token
	}
}