import { User, updateUser, insertUser } from "$db/users";
// import { error, type RequestEvent } from "@sveltejs/kit";

const url = 'https://ipdog-api.smes24.com/api/v1/auth/'

export const authenticateUser = async (username: string, password: string) => {
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
    // let authUser;
    if (!userToken) return null;

    const claim = await revalidateToken(userToken);
    // console.log('claim',claim)
    if (claim?.auth === true) {

        // if(claim?.auth) {
        const authUser = await getUserInfo(userToken);
        // console.log(authUser.username)
        // const _user = new User(authUser);
        if (authUser?.username) {

            const _found = await insertUser(authUser);
            if (_found) authUser.fullName = _found.fullName;
            // console.log(_found);
            // console.log(authUser);
            // if(_found) return authUser;
        }
        // const user = JSON.parse(xxx);
        // console.log(JSON.parse(_user))
        // const res = await insertUser(_user);
        // if(res) authUser.key = res;
        // const _id = res.insertedId.toString();
        // console.log(_id);
        // authUser._id = _id;
        return authUser;
        // }else{
        // event.locals.user = null;
        // }
    } else {
        return null
    }
    // } else {
    //     return null;
    // }

}
