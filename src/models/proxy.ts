import type { ObjectId } from "mongodb"

export interface ProxyServerInterface {
    name?: string,
    hostname: string,
    username: string,
    password: string,
    description?: string,
    token?: string,
    status: boolean,
    _id?: string | undefined,
    
}

export interface SecureProxyServer {
    name?: string,
    hostname: string,
    description?: string,
    status: boolean,
    
}

export class ProxyServer implements ProxyServerInterface {
    public _id? = ''
    public name? = ''
    public hostname = ''
    public username = ''
    public password = ''
    public description? = ''
    public token? = ''
    public status = false

    constructor(server?: ProxyServerInterface) {
        if (server === null || server === undefined) {
            return;
        }
        Object.keys(server).forEach((key, index) => {
            let k = key as keyof ProxyServer;
            if(k==='_id'){
                this[k] = server._id?.toString()
            }else{
                this[k] = server[k as keyof object];
            }
        });
    }
    toArray(): ProxyServerInterface {
        return {
            name: this.name,
            hostname: this.hostname,
            username: this.username,
            password: this.password,
            description: this.description,
            token: this.token,
            status: this.status
        }
    }

    toArraySafe(): SecureProxyServer {
        return {
            name: this.name,
            hostname: this.hostname,
            description: this.description,
            status: this.status
        }
    }
}
