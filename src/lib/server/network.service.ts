
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

    if (res.ok === true) {
        const { devices, count, error} = await res.json();
        return { success: true, error, devices, count }
        // return await res.json();
    } else {
        
        return { success: false, error: 'Subnet scanning failed', count:0, devices:[] }
    }

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
