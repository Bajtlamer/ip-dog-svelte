import { db } from '$lib/db.server';
import type { ProxyServerInterface, Subnet } from '../../models/proxy';

export const getProxyServers = async ():Promise<any[]> => {
  const proxyServer = await db.server.findMany();
  return proxyServer;
}

export const getServerSubnets = async (serverId: number):Promise<any[]> => {
  const subnets = await db.subnet.findMany({
    where: {
      serverId
    }
  });
  return subnets;
}

export const createProxyServer = async (proxy: any): Promise<ProxyServerInterface> => {

  return await db.server.create({
    data: proxy
  });
}

export const findProxyServerById = async (id: number) => {
  return await db.server.findFirst({
    where: {
      id
    },
    include: {
      subnets: {
        include: {
          devices: true
        }
      }
    },
  })
}

export const findSubnetById = async (id: number) => {
  return await db.subnet.findFirst({
    where: {
      id
    },
    include: {
        devices: true
    }
  })
}
