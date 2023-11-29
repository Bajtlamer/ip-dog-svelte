import { error } from '@sveltejs/kit';
import { getProxyServerById } from '$db/sqllite/proxy.js';
import type { TServer } from '../../../models/types.js';

export const load: import('./$types.js').PageServerLoad = async ({ params }) => {
	const serverId = Number(params.serverId);
	if (isNaN(serverId)) {
		throw error(404, 'Page not found');
	}

	const server: TServer | null = await getProxyServerById(serverId);

	if (server) {
		return { server, serverId };
	}

	throw error(404, 'Page not found');
};
