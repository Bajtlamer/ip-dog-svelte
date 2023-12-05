
import { error } from '@sveltejs/kit';
import { findSubnetById, getProxyServerById } from '$db/sqllite/proxy.js';
import type { iSubnet } from '../../../../models/subnet.js';
import type { ProxyServerInterface } from '../../../../models/proxy.js';

export const load: import('./$types.js').PageServerLoad = async ({ depends, params }) => {
	depends('subnet:devices');
    const subnetId = Number(params.subnetId);
    const serverId = Number(params.serverId);

    if(!isNaN(subnetId) && !isNaN(subnetId)){
        const foundSubnet: iSubnet | null = await findSubnetById(subnetId);
        const foundServer: ProxyServerInterface | null = await getProxyServerById(serverId);

        if( foundSubnet === null || foundServer === null){
            throw error(404, 'Subnet not found');
        }
        const subnet: iSubnet = foundSubnet;
        const server: ProxyServerInterface = foundServer;
    
        return { subnet, serverId, subnetId, server };
    }

	throw error(404, 'Page not found');
}
