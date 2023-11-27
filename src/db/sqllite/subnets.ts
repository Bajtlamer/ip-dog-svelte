import { db } from '$lib/db.server';
import type { iSubnet } from '../../models/subnet';
import type { TSubnet } from '../../models/types';


export const createSubnet = async (subnet: iSubnet): Promise<TSubnet> => {
	return await db.subnet.create({
		data: subnet
	});
};

export const findSubnetById = async (id: number): Promise<TSubnet | null> => {
	return await db.subnet.findUnique({
		where: {
			id
		},
		include: {
			devices: true
		}
	});
};

export const findSubnetBySubnetName = async (subnet: string): Promise<TSubnet | null> => {
	return await db.subnet.findUnique({
		where: {
			subnet
		},
		include: {
			devices: true
		}
	});
};
