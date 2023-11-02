import { getDB } from '$db/mongo';
const USERS_COLLECTION = 'users';
const db = getDB();

export interface UserInterface {
    username: string,
    admin: boolean,
    active: boolean
    fullName?: string
}

export class User implements UserInterface {
    public username = '';
    public admin = false;
    public active = false;
    public fullName = '';
    public timestamp ? = Date.now();

    constructor(user?:User) {
        if (user === undefined) {
            return;
        }
        Object.keys(user).forEach((key, index) => {
            let k = key as keyof User;
            this[k] = user[k as keyof object];
        });
    }
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

export const updateUser = async (_id:string, _user:User): Promise<User> => {
    return await db.collection.update( { _id} , { $set: _user });
}

export const insertUser = async (_user:User): Promise<any> => {
    return await db.collection(USERS_COLLECTION).insertOne( _user );
}