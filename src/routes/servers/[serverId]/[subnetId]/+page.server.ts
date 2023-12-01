
import { error } from '@sveltejs/kit';
import { findSubnetById, getProxyServerById } from '$db/sqllite/proxy.js';
import type { CSubnet, iSubnet } from '../../../../models/subnet.js';
import type { ProxyServerInterface } from '../../../../models/proxy.js';

export const load: import('./$types.js').PageServerLoad = async ({ params }) => {
    const subnetId = Number(params.subnetId);
    const serverId = Number(params.serverId);
    
    if(isNaN(subnetId) || isNaN(subnetId)){
        throw error(404, 'Page not found');
    }
    
    const subnet: iSubnet | null = await findSubnetById(subnetId);
    const server: ProxyServerInterface | null = await getProxyServerById(serverId);
    
	if (subnet) {
        return { subnet, serverId, subnetId, server };
	}

	throw error(404, 'Page not found');
}
