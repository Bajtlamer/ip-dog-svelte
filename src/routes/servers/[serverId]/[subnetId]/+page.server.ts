
import { error } from '@sveltejs/kit';
// import { type Subnet } from '../../../../models/proxy.js';
import { findSubnetById } from '$db/sqllite/servers.js';
import type { Subnet } from '../../../../models/proxy.js';
// import type { Subnet } from '@prisma/client';

export const load: import('./$types.js').PageServerLoad = async ({ params }) => {
    const subnetId = Number(params.subnetId);
    const serverId = Number(params.serverId);
    
    if(isNaN(subnetId) || isNaN(subnetId)){
        throw error(404, 'Page not found');
    }
    
    const subnet: Subnet | null = await findSubnetById(subnetId);
    
	if (subnet) {
        return { subnet, serverId, subnetId };
	}

	throw error(404, 'Page not found');
}
