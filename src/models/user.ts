export interface UserInterface {
    username: string
    password: string
    email?: string
    isAdmin?: boolean
    isActive?: boolean
    fullname?: string
    toArray?: Function
    createdAt?: Date
    token?: string
}

export class User implements UserInterface {
    public username = '';
    public password = '';
    public email = '';
    public isAdmin = false;
    public isActive = false;
    public fullname = '';
    public createdAt = new Date();
    public token = '';

    constructor(user?: UserInterface) {
        if (user === null || user === undefined) {
            return;
        }
        Object.keys(user).forEach((key, index) => {
            let k = key as keyof User;
            this[k] = user[k as keyof object];
        });
    }
    public toArray(): UserInterface {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            isAdmin: this.isAdmin,
            isActive: this.isActive,
            fullname: this.fullname,
            createdAt: this.createdAt,
            token: this.token
        }
    }

}
