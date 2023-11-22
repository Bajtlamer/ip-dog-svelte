import { db } from '$lib/db.server';
import type { TServer, TSubnet } from '../../models/types';

export const getProxyServers = async ():Promise<TServer[]> => {
  const proxyServer = await db.server.findMany();
  return proxyServer;
}

export const getServerSubnets = async (serverId: number):Promise<TSubnet[]> => {
  const subnets = await db.subnet.findMany({
    where: {
      serverId
    }
  });
  return subnets;
}

export const createProxyServer = async (proxy: any): Promise<TServer> => {

  return await db.server.create({
    data: proxy
  });
}

export const findProxyServerById = async (id: number): Promise<TServer | null> => {
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

export const findSubnetById = async (id: number): Promise<TSubnet | null> => {
  return await db.subnet.findUnique({
    where: {
      id
    },
    include: {
        devices: true
    }
  })
}
