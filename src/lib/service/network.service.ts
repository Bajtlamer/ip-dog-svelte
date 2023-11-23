import { URL_API_PING, URL_API_SCAN } from "../../constants";
import type { AuthTokenResponse } from "../../models/types";
import { authenticateUser } from "$lib/proxy";
import type { ProxyServerInterface } from "../../models/proxy";

const url = 'https://ipdog-api.smes24.com/api/v1/get/network/'

export const scanSubnet = async (userToken: string, subnet: string, hostname: string) => {
    const res = await fetch(hostname + URL_API_SCAN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        },
        body: JSON.stringify({
            subnet
        }),
    });
    // console.log('STATUS',await res.json())
    if (res.status === 200 || res.status === 201) {
        return res;
        }else if(res.status === 404) {
            throw new Error('API Endpoint Not Found')
        }else if(res.status === 403) {
            const {error} = await res.json();
            throw new Error(error);
        }else if(res.status === 401) {
            const {message} = await res.json();
            throw new Error(message);
        }
        throw new Error('Subnet scanning failed, with an unexpected error');
}

export const pingDevice = async (deviceString?: string, server?: ProxyServerInterface): Promise<boolean> => {
    if (!deviceString || !server) return false;

    const authResponse: AuthTokenResponse = await authenticateUser(server.username, server.password, server.hostname);
    
    if(!authResponse.auth || !authResponse.token) {
        throw new Error(authResponse.message);
    }

    const token: string = authResponse.token;
    
    const split = /\s/g.test(deviceString);
    let device = split ? deviceString.split(' ')[0] : deviceString;
    
    const res = await fetch(server.hostname + URL_API_PING + device, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: token
        }
    });

    if (res.ok === true) {
        const status = await res.json();
        return status.isAlive;
    } else {
        return false;
    }
};
