import { error, redirect } from '@sveltejs/kit';
import { getProxyServerById } from '$db/sqllite/proxy.js';
import type { TServer } from '../../../models/types.js';

export const load: import('./$types.js').PageServerLoad = async ({ locals, depends, params }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	depends('server:subnets');

	const serverId = Number(params.serverId);

	if (isNaN(serverId)) {
		throw error(400, 'Page not found');
	}

	const server: TServer | null = await getProxyServerById(serverId);

	if (server) {
		return { server };
	}

	throw error(404, 'Page not found');
};
