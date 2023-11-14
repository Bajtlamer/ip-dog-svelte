import { findProxyServerById } from '$db/proxies.js';
import { error } from '@sveltejs/kit';
import { ProxyServer } from '../../../models/proy.server.js';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
    const proxyServer = await findProxyServerById(params._id);
	if (proxyServer) {
        const _server = new ProxyServer(proxyServer).toArraySafe();
        // console.log(_server)
        return { _server };
	}

	throw error(404, 'Page not found');
}