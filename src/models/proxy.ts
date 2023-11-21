
export interface ProxyServerInterface {
    id?: number
    name: string,
    hostname: string,
    username: string,
    password: string,
    description: string | null,
    status: boolean,
}

export interface SecureProxyServer {
    name: string,
    hostname: string,
    description?: string | null,
    status: boolean,
    
}

export class ProxyServer implements ProxyServerInterface {
    public name = ''
    public hostname = ''
    public username = ''
    public password = ''
    public description = ''
    public status = false

    constructor(server?: ProxyServerInterface) {
        if (server === null || server === undefined) {
            return;
        }
        Object.keys(server).forEach((key, index) => {
            let k = key as keyof ProxyServer;
            this[k] = server[k as keyof object];
        });
    }
    
    toArray(): ProxyServerInterface {
        return {
            name: this.name,
            hostname: this.hostname,
            username: this.username,
            password: this.password,
            description: this.description,
            status: this.status,
        }
    }

    toArraySafe(): SecureProxyServer {
        return {
            // id: Number(this.id),
            name: this.name,
            hostname: this.hostname,
            description: this.description,
            status: this.status
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
        return this.toArray();
    }
}
