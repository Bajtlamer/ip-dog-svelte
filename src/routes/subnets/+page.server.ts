import type { Actions } from './$types';
import { scanSubnet } from '$lib/server/network.service';
import { ScanResult } from '../../models/subnet';
import type { PageServerLoad } from '../$types';
import { authenticateUser } from '$lib/proxy';
import { fail, type ActionFailure, redirect } from '@sveltejs/kit';
// import { ProxyServer, type ProxyServerInterface } from '../../models/proxy';

export const load: PageServerLoad = async ({ cookies, locals }: any) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/');
	}
};

let scanResponse: any;
let server: any;
let status: boolean = false;

export const actions: Actions = {
	subnets: async ({ cookies, request }: any) => {

		const data = await request.formData();
		const subnet = data.get('subnet');
		const username = data.get('username');
		const password = data.get('password');
		const hostname = data.get('hostname');

		try {
			const _authResponse = await authenticateUser(username, password, hostname);

			if (!_authResponse.auth || !_authResponse.token) {
				return { subnet, ...scanResponse };
			}
			const token = _authResponse.token;
			
			server = {username, password, hostname, status, token}

			const response: any = await scanSubnet(token, subnet);

			if (response instanceof Response && response?.status === 200) {
				const data = await response.json();
				scanResponse = new ScanResult(data);
				return { subnet, server, ...scanResponse };
			} else {
				return fail(400, { subnet, ...response });
			}
		} catch (error: any) {
			return fail(400, { subnet, message: error.message });
		}
	}
};
