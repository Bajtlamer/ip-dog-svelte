import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL);

// connect to the database
export async function dbConnect(): Promise<void> {
    await client.connect();
}

// disconnect from the database
export async function disconnect(): Promise<void> {
    await client.close();
}

// get the database
export function getDB(): any {
    return client.db();
}
