import type { Actions } from './$types';
import type { PageServerLoad } from '../$types';
import { ProxyServer, type ProxyServerInterface, type TProxyServerCreatePrototype } from '../../models/proxy';
import { fail, redirect } from '@sveltejs/kit';
import { createProxyServer, deleteProxyServer, getProxyServers, updateProyServer } from '$db/sqllite/proxy';
import type { TServer } from '../../models/types';
import { error } from 'console';

export const load: PageServerLoad = async ({ locals, depends }: any) => {
	depends('server:delete');

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

		const status: boolean = false;

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

	delete_server: async ({ request }: any) => {
		const data = await request.formData();
		const serverId = Number(data.get('serverId'));

		if(isNaN(serverId)) {
			throw error(400, 'Delete server failed, invalid serverId.');
		}
		await deleteProxyServer(serverId);

		console.log('Deleting server with ID:', serverId);
		// const proxyServers = await getProxyServers();
		// console.log("🚀 ~ file: +page.server.ts:64 ~ delete_server: ~ proxyServers:", proxyServers)

		// return { proxyServers };
	},

	edit_server: async ({ request }: any) => {
		const data = await request.formData();
		const serverId = Number(data.get('id'));

		console.log("edit server data:", data)
		const server: ProxyServerInterface = {
			name: data.get('server-name'),
			username: data.get('server-username'),
			password: data.get('server-password'),
			hostname: data.get('server-hostname'),
			description: data.get('server-description') || '',
			status: false
		}


		if(isNaN(serverId)) {
			throw error(400, 'Update server failed, invalid serverId.');
		}

		const proxyServers = await updateProyServer(serverId, server);

		console.log('Updating server with ID:', server);
		// const proxyServers = await getProxyServers();
		// console.log("🚀 ~ file: +page.server.ts:64 ~ delete_server: ~ proxyServers:", proxyServers)

		return { proxyServers };
	}
};
