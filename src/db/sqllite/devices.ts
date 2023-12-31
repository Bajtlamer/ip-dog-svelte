import { db } from '$lib/db.server';
import type { ISubnet, iDevice } from '../../models/device';

export const getAllDevices = async (): Promise<ISubnet[]> => {
	return await db.device.findMany({
		orderBy: [
			{
				description: 'asc'
			}
		],
		include: {
			owner: true
		}

	});
};

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

export const deleteDevice = async (deviceId: number): Promise<iDevice | null> => {
	return await db.device.delete({
		where: {
			id: deviceId
		}
	});
};
