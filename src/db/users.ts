import { getDB } from '$db/mongo';
import { User } from '../models/user';

const USERS_COLLECTION = 'users';
const db = getDB();

type UserSummary = Pick<User, "username" | "fullName">;

export async function getUsersCollection(skip: number, limit: number): Promise<User[]> {

    const data = await db.collection(USERS_COLLECTION).find({}).project({ _id: 0 }).skip(skip).limit(limit).toArray();

    return data;
}

export const findUserByUsername = async (username: string): Promise<User | undefined> => {

    try {
        const user = await db.collection(USERS_COLLECTION).findOne({ username });
        return user;

    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (user: User): Promise<User | undefined> => {
    try {
        const _user = await findUserByUsername(user?.username)

        if (_user) {
            return new User(_user);
        } else {
            const res = await insertUser(new User(_user))
        }

        return _user;
    } catch (err) {
        console.log(err)
    }

}

export const insertUser = async (user: User): Promise<any> => {
    try {
        const _user = await findUserByUsername(user?.username);

        if (_user) {
            return _user;
        }

        const res = await db.collection(USERS_COLLECTION).insertOne(new User(user));

        return (res) ? res : null;

    } catch (err) {
        console.log(err)
    }
}