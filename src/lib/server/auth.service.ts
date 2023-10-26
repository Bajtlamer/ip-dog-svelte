const url = 'https://ipdog-api.smes24.com/api/v1/auth/'

export const authenticateUser = async(username: string, password: string) => {
    const res = await fetch(url + 'login', {
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

    if(res.ok === true) {
        return await res.json();
    }

    const data = await res.json();
    
    return data;
}

export const getUserInfo = async (userToken: string) => {
    const res = await fetch(url + 'profile', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        }
    });
    
    if(res.ok === true) {
        return await res.json();
    }
    
    return null;
}

export const revalidateToken = async (userToken: string) => {
    const res = await fetch(url + 'verify', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        }
    });
    
    if(res.ok === true) {
        return await res.json();
    }else{
        return res.json()
    }
    
    return null;
}
