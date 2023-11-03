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
        if (user === null || user === undefined) {
            return;
        }
        Object.keys(user).forEach((key, index) => {
            let k = key as keyof User;
            this[k] = user[k as keyof object];
        });
    }
}
