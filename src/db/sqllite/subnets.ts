import { db } from '$lib/db.server';
import type { iSubnet, iSubnetCreatePrototype } from '../../models/subnet';
import type { TEditSubnet, TSubnet } from '../../models/types';


export const getAllSubnets = async (): Promise<iSubnet[]> => {
	return await db.subnet.findMany({
		orderBy: [
			{
				id: 'asc'
			}
		],
		include: {
			devices: true
		}
	});
};

export const createSubnet = async (subnet: iSubnetCreatePrototype): Promise<iSubnet> => {
	return await db.subnet.create({
		data: subnet
	});
};

export const findSubnetById = async (serverId: number): Promise<any | null> => {
	return await db.subnet.findMany({
		where: {
			serverId: serverId
		},
		include: {
			_count: {
				select: {devices: true}
			}
		}
	});
};

export const getSubnetsByServerId = async (serverId: number): Promise<TSubnet[] | null> => {
	return await db.subnet.findMany({
		where: {
			serverId: serverId
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

export const deleteSubnet = async (subnetId: number): Promise<void> => {
	await db.subnet.delete({
		where: {
			id: subnetId
		}
	});
};

export const updateSubnet = async (subnetId: number, data: TEditSubnet): Promise<TSubnet | null> => {
	return await db.subnet.update({
	where: {
	  id: subnetId,
	},
	data: data,
  })
};
