import type { Actions } from "./$types"
import { scanSubnet } from "$lib/server/network.service";

// export async function load() {
// 	const devices:any[] = []
// 	return { devices }
// }

export const actions: Actions = {
	subnets: async ({ cookies, request }: any) => {
		// console.log('test')
		const data = await request.formData();
		const subnet = data.get('subnet');
		// console.log(subnet);
		const userToken = cookies.get("auth");
		// console.log(userToken);

		const devices = await scanSubnet(userToken, subnet);

		if (devices) {
			console.log(devices);
			return { subnet, ...devices }
		} else {
			console.log(devices);
			return { subnet, ...devices }
		}

	}
}
