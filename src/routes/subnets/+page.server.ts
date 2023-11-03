import type { Actions } from "./$types"
import { scanSubnet } from "$lib/server/network.service";

export const actions: Actions = {
	subnets: async ({ cookies, request }: any) => {
		// console.log('test')
		const data = await request.formData();
		const subnet = data.get('subnet');
		console.log(subnet);
		const userToken = cookies.get("auth");
		console.log(userToken);

		const _response = await scanSubnet(userToken, subnet);

		if (_response) {
			console.log(_response);
			return { subnet, ..._response }
		} else {
			console.log(_response);
			return { subnet, ..._response }
		}

	}
}
