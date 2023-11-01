import { getDB } from '$db/mongo';
const USERS_COLLECTION = 'users';
const db = getDB();

interface User {
    email: string,
    isAdmin: boolean,
    isActive: boolean
    fullName?: string
}

export async function getUsersCollection(skip:number, limit:number): Promise<User[]>
{
    // get repositories from MongoDB with skip and limit
    const data = await db.collection(USERS_COLLECTION).find({}).project({_id:0}).skip(skip).limit(limit).toArray();

    // return JSON response
    return data;
}

export async function getUser(search:string): Promise<User>
{
    // get repositories from MongoDB with search query and regex options
    const data = await db.collection(USERS_COLLECTION).find({email:{$regex:search, $options:'i'}}).project({_id:0}).toArray();

    // return JSON response
    return data;
}