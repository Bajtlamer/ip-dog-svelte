import { URL_API_LOGIN } from "../constants";
import type { ProxyServerInterface } from "../models/proxy";
import { constructUrl } from "./functions";

const url = 'https://ipdog-api.smes24.com/api/v1/auth/'

export const authenticateUser = async (username: string, password: string, host?: string) => {
    let hostname = host || url;
    hostname = constructUrl(hostname) + URL_API_LOGIN;

    try {
        const res = await fetch(hostname, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        // console.log(res.status)
        if(res.status === 200 || res.status === 201) {
            if (res.ok === true) {
                return await res.json();
            }

        }else if(res.status === 404) {
            throw new Error('API Endpoint Not Found')
        }else if(res.status === 403) {
            const {message} = await res.json();
            throw new Error(message);
        }else if(res.status === 401) {
            const {message} = await res.json();
            throw new Error(message);
        }
        throw new Error('Subnet scanning failed, with an unexpected error');
        const data = await res.json();
        
        return data;
        
    } catch (err:any) {
        // console.log('authenticateUser() -> Error:', err?.message);
        throw new Error(err.message);
    }}
    
    export const validateServer = async (server: ProxyServerInterface): Promise<boolean> => {
        const response = await authenticateUser(server.username, server.password, server.hostname);
        return (response)? response.auth : false;
    }
    
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
