import { pingDevice } from "$lib/service/network.service";
// import { ProxyServer, type ProxyServerInterface } from "./proxy";
// import { CSubnet, type iSubnet } from "./subnet";
import type { TServer, TSubnet } from "./types";
import { PrismaClient } from '@prisma/client'

// expose a singleton
export const db = new PrismaClient()


export interface iDevice {
    id?: number
    address: string
    hostname?: string | null
    description?: string | null
    subnetId?: number | null
    serverId?: number | null
    status?: Promise<boolean> | boolean
    // subnet?: CSubnet
}

export class CDevice implements iDevice {
    id = 0;
    subnetId = 0;
    serverId = 0;
    address = '';
    hostname = '';
    description = '';
    status = new Promise<boolean>((resolve) => resolve);
    // subnet = new CSubnet();

    constructor(subnet?: iDevice) {
        Object.assign(this, subnet);
    }

    // setSubnet = (subnet: CSubnet) => {
    //     this.subnet = subnet;
    // }

    // getSubnet = () => {
    //     return new CSubnet(this.subnet);
    // }

    probe = async (server: TServer) => {
        return await pingDevice(this.address, server);
    }

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
            id: this.id,
            subnetId: this.subnetId,
            serverId: this.serverId,
            address: this.address,
            description: this.description,
            hostname: this.hostname,
            status: this.status
        }
    }
}

