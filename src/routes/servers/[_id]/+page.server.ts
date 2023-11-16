import { findProxyServerById } from '$db/proxies.js';
import { error, type Actions } from '@sveltejs/kit';
import { ProxyServer } from '../../../models/proxy.js';
// import { ScanResult } from '../../../models/subnet.js';
// import { scanSubnet } from '$lib/server/network.service.js';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
    const proxyServer = await findProxyServerById(params._id);
	if (proxyServer) {
        const _server = new ProxyServer(proxyServer).toArray();
        // console.log(_server)
        return { _server };
	}

	throw error(404, 'Page not found');
}
