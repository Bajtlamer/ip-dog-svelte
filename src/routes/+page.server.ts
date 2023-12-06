import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }: any) => {
	// console.log('LOAD:',locals.user)
	if (!locals.user) {
		throw redirect(302, '/login');
	}
};
