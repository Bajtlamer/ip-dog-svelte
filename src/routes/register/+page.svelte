<script lang="ts">
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { User } from '../../models/user';

	export let form: ActionData;

	let user = new User(form?.user);

	let email 	 = user.email;
	let username = user.username;
	let fullname = user.fullname;
	
	let password = '';

	const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>

<section class="p-0 pt-1 mx-auto w-96 md:pt-24">
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-8 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Create a new user account
			</h1>
			<form
				action="?/register&redirectTo={redirectTo}"
				method="POST"
				class="space-y-4 md:space-y-6"
			>
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Fullname or Nickname</label
					>
					<input
						bind:value={fullname	}
						type="text"
						name="fullname"
						id="fullname"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Fullname or Nickname"
					/>
				</div>
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Your email</label
					>
					<input
						bind:value={email}
						type="text"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@company.com"
					/>
				</div>
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Login name</label
					>
					<input
						bind:value={username}
						type="text"
						name="username"
						id="username"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="username"
						required
					/>
				</div>
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="password"
						required
					/>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="text-gray-500 dark:text-gray-300">Admin account?</label>
						</div>
					</div>
				</div>
				<button
					formaction="?/register&redirectTo={redirectTo}"
					class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					type="submit"
					>Create account</button
				>

				<p class="text-sm font-light text-gray-500 dark:text-gray-200">
					Already have account? Go to <a
						href="/login"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Login page</a
					>
				</p>

				{#if form?.message}
					<p class="text-white">{form?.message}!</p>
				{/if}
			</form>
		</div>
	</div>
</section>
