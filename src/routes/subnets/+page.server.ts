import type { Actions } from "./$types"
import { scanSubnet } from "$lib/server/network.service";
import { ScanResult } from "../../models/subnet";
import type { PageServerLoad } from "../$types";
import { authenticateUser } from "$lib/proxy";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies,locals }:any) => {
	const userToken = cookies.get('auth');
	const user = locals.user;
	// console.log(userToken)

	return {
		userToken
	} 
}


let scanResponse:ScanResult = new ScanResult();

export const actions: Actions = {
	subnets: async ({ cookies, request }: any) => {
		// console.log('test')
		const data = await request.formData();
		const subnet = data.get('subnet');
		const username = data.get('username');
		const password = data.get('password');
		const hostname = data.get('hostname');

		const _authResponse = await authenticateUser(username, password, hostname);

		// console.log(_authResponse);
		if(!_authResponse.auth || !_authResponse.token) {
			return {subnet, ...scanResponse};
		}
			const userToken = _authResponse.token;
		
		// console.log(userToken);

		scanResponse = await scanSubnet(userToken, subnet);
		

		if (scanResponse.success) {
			console.log('success:',scanResponse);
			scanResponse = new ScanResult(scanResponse);
			return {subnet, ...scanResponse}
		} else {
			scanResponse = new ScanResult();
			console.log('failed',scanResponse);
			return { subnet, error: 'Subnet scanning failed.', count:0, devices:[] };
			// return {subnet, ...scanResponse}
		}

	}
}
