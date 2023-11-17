import { parseResponseToJson } from "$lib/functions";
import { fail } from "@sveltejs/kit";
import { ScanResult } from "../../models/subnet";

const url = 'https://ipdog-api.smes24.com/api/v1/get/network/'

export const scanSubnet = async (userToken: string, subnet: string) => {
    const res = await fetch(url + 'scan', {
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

export const pingDevice = async (userToken: string, device: string) => {
    const res = await fetch(url + 'ping', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        },
        body: JSON.stringify({
            device
        }),
    });

    if (res.ok === true) {
        return await res.json();
    } else {
        console.log(res)
        return res;
    }

}
