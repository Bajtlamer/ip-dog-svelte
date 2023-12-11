import { db } from '$lib/db.server';
import type { ProxyServerInterface, TProxyServerCreatePrototype } from '../../models/proxy';
import type { iSubnet } from '../../models/subnet';
import type { TServer, TSubnet } from '../../models/types';

export const getProxyServers = async (): Promise<TServer[]> => {
	return await db.server.findMany(
		{
			orderBy: [
				{
					id: 'asc'
				}
			],
			include: {
				subnets: {
					orderBy: [
						{
							id: 'desc'
						}
					],
					include: {
						devices: true
					}
				}
			}
		}
	);
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

export const updateProyServer = async (id: number, proxy: TProxyServerCreatePrototype): Promise<ProxyServerInterface> => {
	return await db.server.update({
		where: {
			id
		},
		data: proxy
	});
}

export const findSubnetById = async (id: number): Promise<iSubnet | null> => {
	const subnet = await db.subnet.findUnique({
		where: {
			id
		},
		include: {
			devices: true,
		}
	});

	if (subnet && subnet.devices) {
        subnet.devices.sort((a, b) => {
            const lastPartA = parseInt(a.address.split('.').pop() || '', 10);
            const lastPartB = parseInt(b.address.split('.').pop() || '', 10);
            return lastPartA - lastPartB;
        });
    }

    return subnet;
};
