// import { findProxyServerById } from '$db/__proxies.js';
import { error, type Actions, fail } from '@sveltejs/kit';
import { ProxyServer, type ProxyServerInterface } from '../../../models/proxy.js';
import { findProxyServerById } from '$db/sqllite/servers.js';
// import { ScanResult } from '../../../models/subnet.js';
// import { scanSubnet } from '$lib/server/network.service.js';

export const load: import('./$types.js').PageServerLoad = async ({ params }) => {
    const id = Number(params.id);
    if(isNaN(id)){
        console.log('isNaN')
        throw error(404, 'Page not found');
    }
    
    const proxyServer:ProxyServerInterface | null = await findProxyServerById(id);

    
	if (proxyServer) {
        const server = new ProxyServer(proxyServer).toArray();
        return { server };
	}

	throw error(404, 'Page not found');
}
