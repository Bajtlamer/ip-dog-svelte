import { pingDevice } from '$lib/service/network.service';
import type { iSubnet } from './subnet';
// import { ProxyServer, type ProxyServerInterface } from "./proxy";
// import { CSubnet, type iSubnet } from "./subnet";
import type { TServer } from './types';
import { PrismaClient } from '@prisma/client';

// expose a singleton
export const db = new PrismaClient();

export interface iDevice {
	id?: number;
	address: string;
	hostname?: string | null;
	description?: string | null;
	subnetId: number;
	// serverId: number;
	status?: Promise<boolean> | boolean | null;
	// subnet?: CSubnet
}


export interface IDevice extends iDevice {
	owner: iSubnet;
}

export class CDevice implements iDevice {
	id = 0;
	subnetId = 0;
	// serverId = 0;
	address = '';
	hostname = '';
	description = '';
	status = new Promise<boolean>((resolve) => resolve);
	// subnet = new CSubnet();

	constructor(subnet?: iDevice) {
		Object.assign(this, subnet);

		if (typeof this.address === 'string' && this.address.length > 0) {
			const split = this.address.split(/\s+/);

			if (split.length > 1) {
				this.address = split[0];
				this.hostname = split[1];
			}
		}
	}

	// setSubnet = (subnet: CSubnet) => {
	//     this.subnet = subnet;
	// }

	// getSubnet = () => {
	//     return new CSubnet(this.subnet);
	// }

	probe = async (server: TServer) => {
		return await pingDevice(this.address, server);
	};

	// isOnline = (): Promise<boolean> => {
	//     const subnet = this.getSubnet();
	//     if (subnet instanceof CSubnet === false) return this.status;
	//     const server = subnet.getServer();
	//     console.log(server);
	//     if (server !instanceof ProxyServer) return this.status;

	//     return pingDevice(this.address, server);
	// }

	toArray(): iDevice {
		return {
			// id: this.id,
			subnetId: this.subnetId,
			// serverId: this.serverId,
			address: this.address,
			description: this.description,
			hostname: this.hostname,
			// status: this.status
		};
	}
}
