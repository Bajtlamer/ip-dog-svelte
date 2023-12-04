import { db } from '$lib/db.server';
import type { iDevice } from '../../models/device';

export const insertDevice = async (device: iDevice): Promise<iDevice> => {
	return await db.device.create({
		data: device
	});
};

export const updateDevice = async (deviceId: number, data: iDevice): Promise<iDevice | null> => {
	return await db.device.update({
	where: {
	  id: deviceId,
	},
	data: data,
  })
};
