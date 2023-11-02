import { User, insertUser } from "$db/users";
// import { error, type RequestEvent } from "@sveltejs/kit";

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
    }else{
        return null;
    }
    
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
        return null
    }
}

export const handleUser = async (userToken?: string) => {
    if ( userToken ) {
        const claim = await revalidateToken(userToken);
        // console.log(claim)
        if(userToken && claim?.auth === true) {

            // if(claim?.auth) {
                const authUser = await getUserInfo(userToken);
                const _user = new User(authUser);
                // console.log(_user);
                // const user = JSON.parse(xxx);
                // console.log(JSON.parse(_user))
                const res = await insertUser(_user);
                // if(res) authUser.key = res;
                const _id = res.insertedId.toString();
                // console.log(_id);
                authUser._id = _id;
                return (authUser)? authUser : null;
            // }else{
                // event.locals.user = null;
            // }
        }else{
            return null
        }
    } else {
        return null;
    }

}
