import type { Actions } from './$types';
import { scanSubnet } from '$lib/service/network.service';
import { ScanResult } from '../../models/subnet';
import type { PageServerLoad } from '../$types';
import { authenticateUser } from '$lib/proxy';
import { fail, redirect } from '@sveltejs/kit';
import type { AuthTokenResponse, TSubnet } from '../../models/types';
import type { ProxyServerInterface } from '../../models/proxy';
import {
	createSubnet,
	deleteSubnet,
	findSubnetBySubnetName,
	updateSubnet
} from '$db/sqllite/subnets';

let scanResponse: ScanResult;
let server: ProxyServerInterface;
// let status: boolean = false;

export const load: PageServerLoad = async ({ locals }) => {
	console.log(locals)
	if (!locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	subnets: async ({ request }) => {
		const data = await request.formData();
		const subnet = data.get('subnet')?.slice();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const hostname = data.get('hostname')?.toString();
		const name = data.get('name')?.toString();
		const id = Number(data.get('id'));
		let status: boolean = false;


		if (typeof password !== 'string' || !password) {
			return fail(400, { message: 'Invalid password' });
		}

		if (typeof username !== 'string' || !username) {
			return fail(400, { message: 'Invalid username' });
		}

		if (typeof hostname !== 'string' || !hostname) {
			return fail(400, { message: 'Invalid hostname' });
		}

		if (typeof subnet !== 'string' || !subnet) {
			return fail(400, { message: 'Invalid subnet' });
		}

		if (typeof name !== 'string' || !name) {
			return fail(400, { message: 'Invalid subnet name' });
		}

		try {
			if (username && password && hostname) {
				const _authResponse: AuthTokenResponse = await authenticateUser(username, password, hostname);

				if (!_authResponse.auth || !_authResponse?.token) {
					return { subnet };
				}else{
					status = true;
				}

				const token: string = _authResponse.token;

				server = { id, name, username, password, hostname, status, token };

				const response: Response = await scanSubnet(token, subnet, hostname);

				if (response instanceof Response && response?.status === 200) {
					const data = await response.json();
					scanResponse = new ScanResult(data);

					return { subnet, server, token, ...scanResponse };
				} else {
					return fail(400, { subnet, server, ...response });
				}
			}
		} catch (error: any) {
			return fail(400, { subnet, message: error.message });
		}
	},

	save_subnet_result: async ({ request }) => {
		console.log('Jsem na serveru...');
		const data = await request.formData();
		const subnet = data.get('subnet')?.toString();
		const serverId = Number(data.get('serverId'));
		const description = data.get('description')?.toString();

		if (!subnet) return fail(400, {
			message: 'Subnet cannot be empty.',
			subnet,
			description
		});

		const subnetObj: TSubnet = { subnet, serverId, description };

		if (typeof subnet !== 'string' || !subnet) {
			return fail(400, { invalidSubnet: true, subnet });
		}

		if (isNaN(serverId)) {
			console.log('Invalid server ID');
			return fail(400, {
				message: 'Operation failed, expected server ID, but got null.',
				subnet,
				description
			});
		}

		// console.log(`save_subnet_result`, subnetObj);

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

			console.log('Jsem na serveru...novy subnet:', subnetObj.serverId);
			const createdSubnet = (await createSubnet(subnetObj)) as TSubnet;

			if (createdSubnet === null) {
				return fail(400, { subnet, description, message: 'Create subnet failed.' });
			} else {
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
		} catch (err: any) {
			// console.log(err);
			return fail(400, { subnet, message: err?.message });
		}
	},

	delete_subnet: async ({ request }: any) => {
		const data = await request.formData();
		// const subnet = data.get('subnetId');
		const subnetId = Number(data.get('subnetId'));
		console.log('Jsem na serveru...maszu subnet:', subnetId);
		// const description = data.get('description');

		// const subnetObj: TSubnet = { subnet, serverId, description };

		// if (typeof subnet!=='string' ||!subnet) {
		//     return fail(400, { invalidSubnet: true, subnet });
		// }

		if (isNaN(subnetId)) {
			console.log('Invalid subnet ID');
			return fail(400, {
				message: 'Operation failed, expected subnet ID, but got null.'
			});
		} else {
			// console.log(`SUBNET_ID:`, subnetId)
			const response = await deleteSubnet(subnetId);
			return { success: true, response };
		}
	},

	edit_subnet: async ({ request }: any) => {
		// console.log('Jsem na serveru...edituji subnet:');
		const data = await request.formData();
		// console.log(data);
		// const subnet = data.get('subnetId');
		const subnet = data.get('subnet');
		const subnetId = Number(data.get('id'));
		const serverId = Number(data.get('serverId'));
		const description = data.get('subnet-description');
		console.log('Jsem na serveru...edituji subnet:', subnetId);
		// const description = data.get('description');

		const subnetObj: TSubnet = { subnet, serverId, description };
		// console.log(subnetObj);
		// if (typeof subnet!=='string' ||!subnet) {
		//     return fail(400, { invalidSubnet: true, subnet });
		// }

		if (isNaN(subnetId)) {
			console.log('Invalid subnet ID');
			return fail(400, {
				message: 'Operation failed, expected subnet ID, but got null.'
			});
		} else {
			// console.log(`SUBNET_ID:`, subnetId)
			const response = await updateSubnet(subnetId, subnetObj);
			// console.log(response);
			return { success: true, response };
		}
	}
};
