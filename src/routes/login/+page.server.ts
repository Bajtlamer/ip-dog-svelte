import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addUser, getUserByName, updateUser } from '$db/sqllite/user';
import { User, type UserInterface } from '../../models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { PageServerLoad } from '../$types';
import { SALT_ROUNDS } from '../../constants';


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

		const email = data.get('email')?.toString() || '';
		const passwd = data.get('password');
		const username = data.get('username');
		const fullname = data.get('fullname')?.toString() || '';

		if (typeof passwd !== 'string' || typeof username !== 'string' || !username || !passwd) {
			return fail(400, { invalid: true });
		}

		const password = await bcrypt.hash(passwd, SALT_ROUNDS);
		

		const user = new User({ username, password });
		const claim = await getUserByName(user.username);

		if (!claim) {
			message = 'Login failed, user not found.'
			return fail(400, { message, ...user });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		const token = crypto.randomUUID();

		if (passwordMatch === false) {
			message = 'Login failed. Invalid credentials.'
			return fail(400, { message, ...user })
		}

		user.token = token;
		const updatedUser = await updateUser(user);

		cookies.set("session", token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30,
		})
		throw redirect(302, '/')
	}
};
