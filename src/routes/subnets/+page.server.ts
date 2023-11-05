import type { Actions } from "./$types"
import { scanSubnet } from "$lib/server/network.service";
import { ScanResult } from "../../models/subnet";


let scanResponse:ScanResult = new ScanResult();

export const actions: Actions = {
	subnets: async ({ cookies, request }: any) => {
		// console.log('test')
		const data = await request.formData();
		const subnet = data.get('subnet');
		console.log(subnet);
		const userToken = cookies.get("auth");
		// console.log(userToken);

		scanResponse = await scanSubnet(userToken, subnet);
		

		if (scanResponse) {
			console.log(scanResponse);
			scanResponse = new ScanResult(scanResponse);
			return {subnet, ...scanResponse}
		} else {
			scanResponse = new ScanResult();
			console.log(scanResponse);
			return {subnet, ...scanResponse}
		}

	}
}
