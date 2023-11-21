import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addUser } from '$db/sqllite/users';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { SALT_ROUNDS } from '../../constants';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString() || '';
		const passwd = data.get('password');
		const username = data.get('username');
		const fullname = data.get('fullname')?.toString() || '';

		if (typeof username !== 'string' || !username) {
			return fail(400, { user: { username, email, fullname }, message: 'Empty username!' });
		}

		if (typeof passwd !== 'string' || !passwd) {
			return fail(400, { message: 'Empty password!' });
		}

		const password = await bcrypt.hash(passwd, SALT_ROUNDS);
		const token = crypto.randomUUID();

		const user = new User({ username, email, password, fullname, token });
		let createdUser;

		try {
			createdUser = await addUser(user);
		} catch (error: any) {
			return fail(400, { user: user.toArray(), message: error?.message });
		}

		if (createdUser) {
			throw redirect(303, '/login');
		} else {
			return fail(400, { user: user.toArray(), message: 'Create user failed.' });
		}

		// return { user }
	}
};
