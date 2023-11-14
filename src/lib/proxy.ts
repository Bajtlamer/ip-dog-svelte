import type { ProxyServerInterface } from "../models/proy.server";
import { constructUrl } from "./functions";

const url = 'https://ipdog-api.smes24.com/api/v1/auth/'

export const authenticateUser = async (username: string, password: string, host?: string) => {
    let hostname = host || url;
    hostname = constructUrl(hostname) + '/api/v1/auth/login';
    // console.log(hostname);

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

        if (res.ok === true) {
            return await res.json();
        }
        const data = await res.json();
        
        return data;
        
    } catch (err:any) {
        console.log('authenticateUser() -> Error:', err?.message);
        return {auth:false, message: err?.message};
    }}
    
    export const validateServer = async (server: ProxyServerInterface): Promise<boolean> => {
        const response = await authenticateUser(server.username, server.password, server.hostname);
        return (response)? response.auth : false;
    }
    
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
