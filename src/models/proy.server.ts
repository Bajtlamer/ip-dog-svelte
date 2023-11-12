export interface ProxyServerInterface {
    name?: string,
    hostname: string,
    username: string,
    password: string,
    description?: string,
    token?: string
}

export class ProxyServer implements ProxyServerInterface {
    public name? = ''
    public hostname = ''
    public username = ''
    public password = ''
    public description? = ''
    public token? = ''

    constructor(server?: ProxyServer) {
        if (server === null || server === undefined) {
            return;
        }
        Object.keys(server).forEach((key, index) => {
            let k = key as keyof ProxyServer;
            this[k] = server[k as keyof object];
        });
    }
}
