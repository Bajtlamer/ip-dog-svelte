import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { updateDevice } from "$db/sqllite/devices";

export const load: PageServerLoad = async ({ locals }) => {
    console.log('Server.svelte, devices...', locals)
};

export const actions: Actions = {
	edit: async ({ request }) => {
		const data = await request.formData();
		const address = data.get('address')?.toString();
		const description = data.get('device-description')?.toString();
		const subnetId = Number(data.get('subnetId'));
		const id = Number(data.get('deviceId'));
        console.log(data)



		if (typeof address !== 'string' || !address) {
            return fail(400, { message: 'Invalid IP address' });
		}

		if (typeof description !== 'string' || !description) {
            return fail(400, { message: 'Invalid description' });
		}

		if (typeof id !== 'number' || !id) {
            return fail(400, { message: 'Empty device ID' });
		}

		if (typeof subnetId !== 'number' || !subnetId) {
            return fail(400, { message: 'Empty device ID' });
		}

        const _device = {address, description, id, subnetId}

		try {
			if (address && description && id) {
                console.log(_device);

                const device = await updateDevice(id, _device);
                return { device }

				// const _authResponse: AuthTokenResponse = await authenticateUser(username, password, hostname);

				// if (!_authResponse.auth || !_authResponse?.token) {
				// 	return { subnet };
				// }else{
				// 	status = true;
				// }

				// const token: string = _authResponse.token;

				// server = { id, name, username, password, hostname, status, token };

				// const response: Response = await scanSubnet(token, subnet, hostname);

				// if (response instanceof Response && response?.status === 200) {
				// 	const data = await response.json();
				// 	scanResponse = new ScanResult(data);

				// 	return { subnet, server, token, ...scanResponse };
				// } else {
				// 	return fail(400, { subnet, server, ...response });
				// }
			}
		} catch (error: any) {
			return fail(400, { device: _device, message: error.message });
		}
	}
}