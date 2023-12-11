import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { deleteDevice, getAllDevices, updateDevice } from "$db/sqllite/devices";
import { error } from "console";
import type { IDevice } from "../../models/device";
// import { getProxyServerById } from "$db/sqllite/proxy";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	const devices:IDevice[] = await getAllDevices();
	return { devices };

};

export const actions: Actions = {
	edit: async ({ request }) => {
		const data = await request.formData();
		const address = data.get('address')?.toString();
		const hostname = data.get('hostname')?.toString() || '';
		const description = data.get('device-description')?.toString() || '';
		const subnetId = Number(data.get('subnetId'));
		const id = Number(data.get('deviceId'));
		// const serverId = Number(data.get('serverId'));

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

		// if (typeof serverId !== 'number' || !serverId) {
        //     return fail(400, { message: 'Expected server ID ans number, but got ' + typeof(serverId) });
		// }

		// const server = await getProxyServerById(serverId);
        const _device = {address, hostname, description, id, subnetId}

		try {
			if (address && description && id) {
                console.log(_device);

				// if(!server) {
				// 	fail(400, {message: 'Create instance of ProxyServer failed'});
				// }

				// const server = new ProxyServer(_server);
				const device = await updateDevice(id, _device);

				if (device) {
                	return { device }
				} else {
					fail(400, {message: 'Update device failed'});
				}
			}
		} catch (error: any) {
			return fail(400, { device: _device, message: error.message });
		}
	},

	delete: async ({ request }: any) => {
		const data = await request.formData();
		const deviceId = Number(data.get('deviceId'));

		console.log("edit server data:", data)

		if(isNaN(deviceId)) {
			throw error(400, 'Update server failed, invalid deviceId.');
		}

		const device = await deleteDevice(deviceId);

		console.log('Device with ID:' + deviceId + ' has deleted');
		// const proxyServers = await getProxyServers();
		// console.log("🚀 ~ file: +page.server.ts:64 ~ delete_server: ~ proxyServers:", proxyServers)

		return { device: device };
	}

}