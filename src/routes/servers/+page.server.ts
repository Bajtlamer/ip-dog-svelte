import type { Actions } from './$types';
import { authenticateUser } from '../../lib/server/auth.service';
// import { addProxyServer, getProxyServersCollection } from '../../db/proxies';
import type { PageServerLoad } from '../$types';
import { ProxyServer, type ProxyServerInterface } from '../../models/proxy';
import { fail, redirect } from '@sveltejs/kit';
import { createProxyServer, getProxyServers } from '$db/sqllite/servers';


export const load: PageServerLoad = async ({ locals }: any) => {

	if (!locals?.user) {
		throw redirect(302, '/');
	}
	const proxyServers = await getProxyServers();
	// locals.proxyServers = proxyServers;
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
			const sValidated: ProxyServerInterface = proxy.validate();
			const sCreated: ProxyServerInterface = await createProxyServer(sValidated);

			if (sCreated) {
				const proxyServers:ProxyServerInterface[] = await getProxyServers();
				return { proxyServers, success: true };
			} else {
				return fail(400,{message:'Create failed'})
			}
		} catch (error: any) {
			return fail(400, { message: error?.message });
		}

		// }
		
	}
};
