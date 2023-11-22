
import { error } from '@sveltejs/kit';
// import { Subnet, type ProxyServerInterface } from '../../../models/proxy.js';
import { findProxyServerById, findSubnetById, getServerSubnets } from '$db/sqllite/servers.js';
import type { Subnet } from '@prisma/client';
import type { ProxyServerInterface } from '../../../models/proxy.js';

export const load: import('./$types.js').PageServerLoad = async ({ params }) => {
    const serverId = Number(params.serverId);
    if(isNaN(serverId)){
        // console.log('isNaN')
        throw error(404, 'Page not found');
    }
    
    const server: ProxyServerInterface | null = await findProxyServerById(serverId);

    
	if (server) {
        // const server = new Subnet(subnet).toArray();
        console.log(server)
        return { server, serverId };
	}

	throw error(404, 'Page not found');
}
