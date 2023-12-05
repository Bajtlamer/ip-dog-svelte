import { db } from '$lib/db.server';
import type { TProxyServerCreatePrototype } from '../../models/proxy';
import type { CSubnet, iSubnet } from '../../models/subnet';
import type { TServer, TSubnet } from '../../models/types';

export const getProxyServers = async (): Promise<TServer[]> => {
	const proxyServer = await db.server.findMany();
	return proxyServer;
};

export const getServerSubnets = async (serverId: number): Promise<TSubnet[]> => {
	const subnets = await db.subnet.findMany({
		where: {
			serverId
		}
	});
	return subnets;
};

export const deleteProxyServer = async (serverId: number): Promise<void> => {
	await db.server.delete({
		where: {
			id: serverId
		}
	});
};

export const createProxyServer = async (proxy: TProxyServerCreatePrototype): Promise<TServer> => {
	return await db.server.create({
		data: proxy
	});
};

export const getProxyServerById = async (id: number): Promise<TServer | null> => {
	return await db.server.findFirst({
		where: {
			id
		},
		include: {
			subnets: {
				include: {
					devices: true
				}
			}
		}
	});
};

export const findSubnetById = async (id: number): Promise<iSubnet | null> => {
	return await db.subnet.findUnique({
		where: {
			id
		},
		include: {
			devices: true
		}
	});
};
