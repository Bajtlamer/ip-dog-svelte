import { isValidIpAddress } from "$lib/functions";
import { pingDevice } from "$lib/service/network.service";
import type { iDevice } from "./device";
import { ProxyServer, type ProxyServerInterface } from "./proxy";
import type { TServer } from "./types";
import { PrismaClient } from '@prisma/client'

// expose a singleton
export const db = new PrismaClient()

export interface IScanResult {
    devices:string[],
    count:number,
    message?:string,
    // auth:boolean
}

export class ScanResult implements IScanResult  {
	public devices = ['']
	public count = 0
	// public message = ''
	// public auth = false


	constructor(result?: ScanResult) {
        if (result === null || result === undefined) {
            return;
        }
        Object.assign(this, result);
    }
}

export interface iSubnetCreatePrototype {
    id?: number;
    subnet: string
    description?: string | null;
    serverId: number
    status?: Promise<boolean> | boolean
    server?: ProxyServerInterface | null
}

export interface iSubnet {
    id?: number;
    subnet: string
    description?: string | null;
    serverId: number
    status?: Promise<boolean> | boolean
    server?: ProxyServerInterface | null
    devices?: iDevice[]
}

export class CSubnet implements iSubnet {
    id = 0;
    subnet = ''
    description = ''
    serverId = 0;
    devices = []
    status = new Promise<boolean>((resolve) => resolve);
    server = new ProxyServer();

    constructor(subnet?: iSubnet | null) {
        if (subnet) Object.assign(this, subnet);
    }

    isSubnet = () => {
        return !isValidIpAddress(this.subnet);
    }

    isDevice = () => {
        return isValidIpAddress(this.subnet);
    }

    getServerId = () => this.serverId;

    setProxyServer = (server: ProxyServerInterface) => {
        this.server = new ProxyServer(server);
    }

    getServer = (): ProxyServerInterface | null => {
        return new ProxyServer(this.server);
    }

    probe = async (server: TServer) => {
        return await pingDevice(this.subnet, server);
    }

    isOnline = async (server: TServer): Promise<boolean> => {
        return await pingDevice(this.subnet, server);
    }

    toArray(): iSubnet {
        return {
            id: this.id,
            subnet: this.subnet,
            description: this.description,
            serverId: this.serverId,
            devices: this.devices,
        }
    }
}