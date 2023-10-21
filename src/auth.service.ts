const url = 'https://ipdog-api.smes24.com/api/v1/login'

export const getUsernameAuthToken = async(username:string, password:string) => {
    const res = await fetch(url, {
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

    const data = await res.json();
    return data;
}