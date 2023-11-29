import type { Actions } from './$types';
import { scanSubnet } from '$lib/service/network.service';
import { ScanResult } from '../../models/subnet';
import type { PageServerLoad } from '../$types';
import { authenticateUser } from '$lib/proxy';
import { fail, redirect } from '@sveltejs/kit';
import type { AuthTokenResponse, TSubnet } from '../../models/types';
import type { ProxyServerInterface } from '../../models/proxy';
import { createSubnet, deleteSubnet, findSubnetBySubnetName } from '$db/sqllite/subnets';

let scanResponse: ScanResult;
let server: ProxyServerInterface;
let status: boolean = false;

export const load: PageServerLoad = async ({ cookies, locals }: any) => {

	if (!locals.user) {
		throw redirect(302, '/');
	}
};


export const actions: Actions = {
	subnets: async ({ request }: any) => {

		const data = await request.formData();
		const subnet = data.get('subnet');
		const username = data.get('username');
		const password = data.get('password');
		const hostname = data.get('hostname');
		const name = data.get('name');
		const id = data.get('id');

		try {
			const _authResponse: AuthTokenResponse = await authenticateUser(username, password, hostname);


			if (!_authResponse.auth || !_authResponse?.token) {
				return { subnet };
			}

			const token: string = _authResponse.token;
			
			server = { id, name, username, password, hostname, status, token };

			const response: any = await scanSubnet(token, subnet, hostname);

			if (response instanceof Response && response?.status === 200) {
				const data = await response.json();
				scanResponse = new ScanResult(data);
				
				return { subnet, server, token, ...scanResponse };
			} else {
				return fail(400, { subnet, server, ...response });
			}
		} catch (error: any) {
			return fail(400, { subnet, message: error.message });
		}
	},
	
	save_subnet_result: async ({ request }: any) => {
		console.log('jsem na serveru...');
		const data = await request.formData();
		const subnet = data.get('subnet');
		const serverId = Number(data.get('serverId'));
		const description = data.get('description');
		
		const subnetObj: TSubnet = { subnet, serverId, description };
		
		if (typeof subnet !== 'string' || !subnet) {
			return fail(400, { invalidSubnet: true, subnet });
		}
		
		if (isNaN (serverId)) {
			console.log('Invalid server ID');
			return fail(400, { 
				message: 'Operation failed, expected server ID, but got null.', 
				subnet, 
				description 
			});
		}

		console.log(`save_subnet_result`, subnetObj)

		try {
			// const _authResponse: AuthTokenResponse = await authenticateUser(username, password, hostname);


			// if (!_authResponse.auth || !_authResponse?.token) {
			// 	return fail(400, { authFailed: true, subnet });
			// }
			const exist = await findSubnetBySubnetName(subnet);

			if (null !== exist) {
                console.log('exist', exist);
                return fail(400, { 
					subnet, 
					description, 
					invalidSubnet: true, 
					message: 'Subnet that name already exists.'
				});
            }
			
			const createdSubnet = await createSubnet(subnetObj) as TSubnet;

			if (createdSubnet === null) {
				return fail(400, { subnet, description, message: 'Create subnet failed.' });
			}else{
				return { subnet: createdSubnet };
			}
			// const token: string = _authResponse.token;
			
			// server = { name, username, password, hostname, status, token };

			// const response: any = await scanSubnet(token, subnet, hostname);

			// if (response instanceof Response && response?.status === 200) {
			// 	const data = await response.json();
			// 	scanResponse = new ScanResult(data);
				
			// 	return { subnet, server, token, ...scanResponse };
			// } else {
			// 	return fail(400, { subnet, ...response });
			// }
			// return { subnet, server };
		} catch (error: any) {
			// console.log(error);
			return fail(400, { subnet, message: error.message });
		}
	},

	delete_subnet: async ({ request }: any) => {
		console.log('jsem na serveru...maszu subnet');
        const data = await request.formData();
        // const subnet = data.get('subnetId');
        const subnetId = Number(data.get('subnetId'));
        // const description = data.get('description');
        
        // const subnetObj: TSubnet = { subnet, serverId, description };
        
        // if (typeof subnet!=='string' ||!subnet) {
        //     return fail(400, { invalidSubnet: true, subnet });
        // }
        
        if (isNaN (subnetId)) {
            console.log('Invalid subnet ID');
            return fail(400, { 
                message: 'Operation failed, expected subnet ID, but got null.'
            });
        }else{
			console.log(`SUBNET_ID:`, subnetId)
			const response = await deleteSubnet(subnetId);
			return { success: true, response };
		}

	},
};
