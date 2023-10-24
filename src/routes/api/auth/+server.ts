import { json } from '@sveltejs/kit';
import { getUsernameAuthToken } from '../../../auth.service.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
	const credentials = await request.json();
    let res = credentials;
    const username = credentials?.username;
    const password = credentials?.password;

    if(username && password) {
        // console.log(credentials);
        res = await getUsernameAuthToken(username, password);
    }else{
        res = {auth:false, message:"Empty credentials!"}
    }

	// log all fields

	return json(res);
}