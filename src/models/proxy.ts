import { isValidIpAddress } from "$lib/functions";
import { pingDevice } from "$lib/service/network.service";
import type { TDevice } from "./types";

export type TProxyServerCreatePrototype = {
    name: string;
    username: string;
    password: string;
    hostname: string;
    description?: string | null;
    status?: boolean;
}

export interface ProxyServerInterface {
    id?: number | null;
    name: string
    hostname: string
    username: string
    password: string
    description?: string | null
    token?: string | null
    status: boolean
    // subnets: iSubnet[]
}

export interface SecureProxyServer {
    name: string,
    hostname: string,
    description?: string | null,
    status: boolean,

}

export interface Device {
    id?: number
    address: string;
    hostname?: string
    description?: string
}

export class ProxyServer implements ProxyServerInterface {
    public id = null;
    public name = ''
    public hostname = ''
    public username = ''
    public password = ''
    public description = ''
    public token = ''
    public status = false

    constructor(proxy?: ProxyServerInterface | null) {
        if (proxy) Object.assign(this, proxy);
    }

    isDeviceOnline = async (device: TDevice): Promise<boolean> => {
        if (true === isValidIpAddress(device.address)) {
            return await pingDevice(device.address, this);
        }else {
            console.log('invalid IP')
            return false;
        }
    }

    toArray(): ProxyServerInterface {
        return {
            id: this.id,
            name: this.name,
            hostname: this.hostname,
            username: this.username,
            password: this.password,
            description: this.description,
            status: this.status,
        }
    }

    toCreateArray(): TProxyServerCreatePrototype {
        return {
            name: this.name,
            hostname: this.hostname,
            description: this.description,
            username: this.username,
            password: this.password,
            status: this.status,
        }
    }

    validate = () => {
        if (typeof this.name !== 'string' || !this.name) {
            throw new Error('Server name cannot be empty');
        }
        if (typeof this.hostname !== 'string' || !this.hostname) {
            throw new Error('Hostname cannot be empty');
        }
        if (typeof this.username !== 'string' || !this.username) {
            throw new Error('Username cannot be empty');
        }
        if (typeof this.password !== 'string' || !this.password) {
            throw new Error('Password cannot be empty');
        }
        return this.toCreateArray();
    }
}
