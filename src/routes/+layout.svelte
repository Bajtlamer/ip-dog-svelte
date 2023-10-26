<script lang="ts">
	import { page } from '$app/stores';
	import { menuitems } from './pages.json';
	import '../app.css';

	export let data;
	let open = false;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="flex flex-wrap items-center justify-between max-w-screen-lg p-4 mx-auto">
		<a href="/" class="flex items-center">
			<img src="./logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>IP-dog</span
			>
		</a>
		<div class="flex md:order-2">
			{#if !data.user}
				<a
					href="/login"
					class="hidden px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
					>Login
				</a>
			{:else}
				<span class="self-center pr-4 text-sm font-semibold whitespace-nowrap dark:text-white"
					>{data.user?.username}</span
				>
				<form action="/logout" method="POST">
					<button
						class="hidden px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
						>Logout</button
					>
				</form>
			{/if}
			<button
				on:click={() => {
					open = !open;
				}}
				data-collapse-toggle="navbar-cta"
				type="button"
				class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-cta"
				aria-expanded={open}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
					aria-hidden={open}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
		</div>
		{#if data.user}
			<div
				class="items-center justify-between w-full md:flex md:w-auto md:order-1 {open
					? 'display'
					: 'hidden'}"
				id="navbar-cta"
			>
				<ul
					class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
				>
					{#each menuitems as { item, route }}
						<li class="w-1/4 text-center flex-grow-1">
							<a
								href={route}
								on:click={() => (open = !open)}
								class:active={$page.url.pathname === route}
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>{item}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</nav>

<slot />

<style>
	.active {
		color: blue;
	}
</style>
