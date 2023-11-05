
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
        console.log(res.ok)
        return await res.json();
    } else {
        return null;
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
        console.log(res.ok)
        return await res.json();
    } else {
        return null;
    }

}
