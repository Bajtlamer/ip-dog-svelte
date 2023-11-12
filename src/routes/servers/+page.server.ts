import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { authenticateUser } from "../../lib/server/auth.service"
import { addProxyServer, getProxyServersCollection } from '../../db/proxies';
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies,locals }:any) => {
	const proxyServers = await getProxyServersCollection(0,0);
	console.log(proxyServers);
	// locals.servers = proxyServers;
	// console.log(userToken)

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

		console.log(data)
		// await sleep(1000);
		const _authResponse = await authenticateUser(username, password);
		// console.log(_authResponse)
		if (_authResponse?.auth === true) {
			const token = _authResponse.token;
			// console.log('token:', token)
			const res = await addProxyServer({username, password, hostname, token});
			// return fail(400,{message:'Stala se chyba'})
			// success = true;
			return { username, password, hostname, ..._authResponse }

		} else {
			return { username, password, hostname, ..._authResponse }
		}

	}
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));