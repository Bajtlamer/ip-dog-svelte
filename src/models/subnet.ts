import type { TDevice } from "./types";

export interface ScanResult {
    devices:string[],
    count:number,
    message?:string,
    // auth:boolean
}

export class ScanResult implements ScanResult  {
	public devices = ['']
	public count = 0
	// public message = ''
	// public auth = false


	constructor(result?: ScanResult) {
        if (result === null || result === undefined) {
            return;
        }
        Object.keys(result).forEach((key, index) => {
            let k = key as keyof ScanResult;
            this[k] = result[k as keyof object];
        });
    }
}

export interface iSubnet {
    id?: number;
    subnet: string
    description?: string | null;
    serverId: number
}

export class Subnet implements iSubnet {
    id = 0;
    subnet = ''
    description = ''
    serverId = 0;
    devices = []

    constructor(subnet?: iSubnet) {
        Object.assign(this, subnet);
    }

    toArray(): iSubnet {
        return {
            id: this.id,
            subnet: this.subnet,
            description: this.description,
            serverId: this.serverId,
        }
    }
}