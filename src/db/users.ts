import { getDB } from '$db/mongo';
const USERS_COLLECTION = 'users';
const db = getDB();

type UserSummary = Pick<User, "username" | "fullName">;

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
    public timestamp?= Date.now();

    constructor(user?: User) {
        // console.error(user)
        if (user === null || user === undefined) {
            return;
        }
        Object.keys(user).forEach((key, index) => {
            let k = key as keyof User;
            this[k] = user[k as keyof object];
        });
    }
}

export async function getUsersCollection(skip: number, limit: number): Promise<User[]> {
    // get repositories from MongoDB with skip and limit
    const data = await db.collection(USERS_COLLECTION).find({}).project({ _id: 0 }).skip(skip).limit(limit).toArray();

    // return JSON response
    return data;
}

export const findUserByUsername = async (username: string): Promise<User | undefined> => {

    // get repositories from MongoDB with search query and regex options
    try {
        const user = await db.collection(USERS_COLLECTION).findOne({ username });
        // console.log(user)
        // return JSON response
        return user;

    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (user: User): Promise<User | undefined> => {
    const _user = await findUserByUsername(user?.username)
    console.log(_user)
    if (_user) {
        return new User(_user);
    } else {
        const res = await insertUser(new User(_user))
    }

    return _user;
    // return await db.collection.update({ _id }, { $set: _user });
}

export const insertUser = async (user: User): Promise<any> => {
    try {
        const _user = await findUserByUsername(user?.username);
        // const _unew = new User(_user);
        // console.log(_user);
        // console.log(_unew);

        if (_user) {
            return _user;
        }

        const res = await db.collection(USERS_COLLECTION).insertOne(new User(user));
        // console.log(res);

        return (res) ? res : null;

    } catch (err) {
        console.log(err)
    }
}