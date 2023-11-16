import type { Actions } from "./$types"
import { authenticateUser } from "../../lib/server/auth.service"
import { addProxyServer, getProxyServersCollection } from '../../db/proxies';
import type { PageServerLoad } from "../$types";
import { ProxyServer } from "../../models/proxy";

export const load: PageServerLoad = async ({ cookies,locals }:any) => {
	const proxyServers = await getProxyServersCollection(0,0);

	for(const server of proxyServers) {
		if(server._id) {
			server._id = server?._id.toString();
		}
	};

	return {
		proxyServers
	} 
}

export const actions: Actions = {
	add_server: async ({ cookies, request }: any) => {
		
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('server_password');
		const hostname = data.get('server_address');

		const _authResponse = await authenticateUser(username, password);

		const { auth, token } = _authResponse;
		
		const response = { username, password, hostname, ..._authResponse };

		if (auth) {
			
			const server = new ProxyServer({username, password, hostname, token, status: auth})
			const res = await addProxyServer(server);

		}
		return response;

	}
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));