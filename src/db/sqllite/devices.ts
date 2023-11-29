import { db } from '$lib/db.server';
import type { iDevice } from '../../models/device';

export const insertDevice = async (device: iDevice): Promise<iDevice> => {
	return await db.device.create({
		data: device
	});
};
