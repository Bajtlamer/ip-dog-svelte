import { insertUser } from "$db/users";
import type { ProxyServerInterface } from "../../models/proxy";

const url = 'https://ipdog-api.smes24.com/api/v1/auth/'

export const authenticateUser = async (username: string, password: string, host?: string) => {
    const hostname = host || url;
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

    if (res.ok === true) {
        return await res.json();
    }

    const data = await res.json();

    return data;
}

export const validateServer = async (server: ProxyServerInterface) => {
    const {auth} = await authenticateUser(server.username, server.password, server.hostname);
    return (auth) ? true : false
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

    if (res.ok === true) {
        return await res.json();
    } else {
        return null;
    }

}

export const revalidateToken = async (userToken?: string) => {
    if (!userToken) return null;

    const res = await fetch(url + 'verify', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken
        }
    });

    if (res.ok === true) {
        return await res.json();
    } else {
        return null
    }
}

export const handleUser = async (userToken?: string) => {

    if (!userToken) return null;

    const claim = await revalidateToken(userToken);

    if (claim?.auth === true) {
        const authUser = await getUserInfo(userToken);
        if (authUser?.username) {
            const _found = await insertUser(authUser);
            if (_found) authUser.fullName = _found.fullName;
        }
        return authUser;
    } else {
        return null
    }
}