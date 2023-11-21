import { db } from '$lib/db.server';
import type { ProxyServerInterface } from '../../models/proxy';

export const getProxyServers = async ():Promise<any[]> => {
  const proxyServer = await db.server.findMany();
  return proxyServer;
}

export const createProxyServer = async (proxy: ProxyServerInterface): Promise<ProxyServerInterface> => {

  return await db.server.create({
    data: proxy
  });
}

export const findProxyServerById = async (id: number) => {
  return await db.server.findFirst({
    where: {
      id
    }
  })
}
