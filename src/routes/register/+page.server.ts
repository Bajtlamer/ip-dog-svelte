import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addUser, getUserByName } from '$db/sqllite/user';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


import { SALT_ROUNDS } from '../../constants';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
	  throw redirect(302, '/')
	}
  }

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString() || '';
		const passwd = data.get('password');
		const username = data.get('username');
		const fullname = data.get('fullname')?.toString() || '';

		if (typeof passwd !== 'string' || typeof username !== 'string' || !username || !passwd) {
			return fail(400, { invalid: true });
		}

		const password = await bcrypt.hash(passwd, SALT_ROUNDS);
		const token = crypto.randomUUID();

		const user = new User({ username, email, password, fullname, token });
		const claimUser = await getUserByName(user.username);

		if (claimUser) {
			return fail(400, { claimUser });
		}

		const _addedUser = await addUser(user);

		if (_addedUser) {
			throw redirect(303, '/login');
		} else {
			return fail(400, { user });
		}
	}
};
