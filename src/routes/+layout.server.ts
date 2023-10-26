
/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	const user = locals.user;

	return {user} 
}