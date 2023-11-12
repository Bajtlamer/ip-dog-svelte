import { getDB } from '$db/mongo';
import { ProxyServer, type ProxyServerInterface } from '../models/proy.server';

const PROXY_SERVERS_COLLECTION = 'servers';
const db = getDB();

type UserSummary = Pick<ProxyServerInterface, "hostname" | "name">;

export async function getProxyServersCollection(skip: number, limit: number): Promise<ProxyServerInterface[]> {

    const data = await db.collection(PROXY_SERVERS_COLLECTION).find({}).project({ _id: 0 }).skip(skip).limit(limit).toArray();

    return data;
}

export const findProxyServerByhostname = async (hostname: string): Promise<ProxyServerInterface | undefined> => {

    try {
        const server = await db.collection(PROXY_SERVERS_COLLECTION).findOne({ hostname });
        return server;

    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (server: ProxyServerInterface): Promise<ProxyServerInterface | undefined> => {
    try {
        const _server = await findProxyServerByhostname(server?.hostname)

        if (_server) {
            return new ProxyServer(_server);
        } else {
            const res = await addProxyServer(new ProxyServer(_server))
        }

        return _server;
    } catch (err) {
        console.log(err)
    }

}

export const addProxyServer = async (server: ProxyServerInterface): Promise<any> => {
    try {
        const _server = await findProxyServerByhostname(server?.hostname);

        if (_server) {
            return _server;
        }

        const res = await db.collection(PROXY_SERVERS_COLLECTION).insertOne(new ProxyServer(server));

        return (res) ? res : null;

    } catch (err) {
        console.log(err)
    }
}