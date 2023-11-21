import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getUserByName, updateUsersToken } from '$db/sqllite/users';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { PageServerLoad } from '../$types';


let message = '';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		const password = data.get('password');
		const username = data.get('username');

		if (typeof username !== 'string' || !username) {
			return fail(400, { invalidUsername: true, username });
		}
		if (typeof password !== 'string' || !password) {
			return fail(400, { invalidPassword: true });
		}

		// const password = await bcrypt.hash(password, SALT_ROUNDS);
		
		const user = new User({ username, password });
		const claim = await getUserByName(user.username);
		
		if (!claim) {
			message = 'Login failed, user not found.'
			return fail(400, { message, ...user });
		}

		const passwordMatch = await bcrypt.compare(password, claim.password);

		if (passwordMatch === false) {
			message = 'Login failed. Invalid credentials.'
			return fail(400, { message, ...user })
		}
		
		//Renew a token...
		user.token = crypto.randomUUID();
		const updatedUser = await updateUsersToken(user);
		// console.log(updateUser);

		cookies.set("session", user.token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30,
		})

		console.log('redirecting');
		throw redirect(302, '/');
	}
};
