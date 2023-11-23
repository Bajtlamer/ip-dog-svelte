import type { Actions } from './$types';
import { scanSubnet } from '$lib/service/network.service';
import { ScanResult } from '../../models/subnet';
import type { PageServerLoad } from '../$types';
import { authenticateUser } from '$lib/proxy';
import { fail, redirect } from '@sveltejs/kit';
import type { AuthTokenResponse } from '../../models/types';
import type { ProxyServerInterface } from '../../models/proxy';

export const load: PageServerLoad = async ({ cookies, locals }: any) => {

	if (!locals.user) {
		throw redirect(302, '/');
	}
};

let scanResponse: ScanResult;
let server: ProxyServerInterface;
let status: boolean = false;

export const actions: Actions = {
	subnets: async ({ request }: any) => {

		const data = await request.formData();
		const subnet = data.get('subnet');
		const username = data.get('username');
		const password = data.get('password');
		const hostname = data.get('hostname');
		const name = data.get('name');

		try {
			const _authResponse: AuthTokenResponse = await authenticateUser(username, password, hostname);


			if (!_authResponse.auth || !_authResponse?.token) {
				return { subnet };
			}

			const token: string = _authResponse.token;
			
			server = { name, username, password, hostname, status, token };

			const response: any = await scanSubnet(token, subnet, hostname);

			if (response instanceof Response && response?.status === 200) {
				const data = await response.json();
				scanResponse = new ScanResult(data);
				
				return { subnet, server, token, ...scanResponse };
			} else {
				return fail(400, { subnet, ...response });
			}
		} catch (error: any) {
			return fail(400, { subnet, message: error.message });
		}
	}
};
