import type { Actions } from "./$types"
import { scanSubnet } from "$lib/server/network.service";

// export async function load() {
// 	const devices:any[] = []
// 	return { devices }
// }

// interface ResponseData {
// 	subnet: string,
// 	type: string,
// 	devices: string[],
// 	status:number
// }
// let devices:string[] = [];
// let subnet:string = '';

// export const load = async (request) => {
// 	const data = await request;
// 	// console.log(request)
// 	// const subnet = data.get('subnet');
// 	return {
// 		devices,
// 		subnet
// 	}
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
		
		// const responseData: ResponseData = {
		// 	subnet,
		// 	type:"success",
		// 	devices,
		// 	status:200
		// }


		if (devices) {
			console.log(devices);
			return {subnet, ...devices}
		} else {
			// console.log(devices);
			return { subnet }
		}

	}
}
