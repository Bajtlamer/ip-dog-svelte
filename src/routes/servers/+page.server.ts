import type { Actions } from './$types';
import type { PageServerLoad } from '../$types';
import { ProxyServer, type TProxyServerCreatePrototype } from '../../models/proxy';
import { fail, redirect } from '@sveltejs/kit';
import { createProxyServer, getProxyServers } from '$db/sqllite/servers';
import type { TServer } from '../../models/types';

export const load: PageServerLoad = async ({ locals }: any) => {
	if (!locals?.user) {
		throw redirect(302, '/');
	}
	const proxyServers = await getProxyServers();
	return { proxyServers };
};

export const actions: Actions = {
	add_server: async ({ request }: any) => {
		const data = await request.formData();

		const name = data.get('name');
		const username = data.get('username');
		const password = data.get('server_password');
		const hostname = data.get('server_address');
		const description = data.get('description') || '';

		let status: boolean = false;

		const proxy: ProxyServer = new ProxyServer({
			name,
			username,
			password,
			hostname,
			description,
			status
		});

		try {
			const sValidated: TProxyServerCreatePrototype = proxy.validate();
			const sCreated: TServer = await createProxyServer(sValidated);

			if (sCreated) {
				const proxyServers: TServer[] = await getProxyServers();
				return { proxyServers, success: true };
			} else {
				return fail(400, { message: 'Create failed' });
			}
		} catch (error: any) {
			return fail(400, { message: error?.message });
		}
	},

	delete_server: async ({ request, params }: any) => {
		const data = await request.formData();
		const serverId = data.get('serverId');
		console.log('Deleting server with ID:', serverId);
	}
};
