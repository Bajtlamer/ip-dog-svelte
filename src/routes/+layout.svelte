<script lang="ts">
	import { page } from '$app/stores';
	import { menuitems } from './pages.json';
	import '../app.css';
	import { version } from '$app/environment';

	export let data;
	let open = false;
	let profileOpen = false;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="flex flex-wrap items-center justify-between max-w-screen-lg p-4 mx-auto">
		<a href="/" class="flex items-center">
			<img src="/logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>IP-dog <span class="text-xs">v{version}.beta</span></span
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
				<div class="self-center pr-4 text-sm font-semibold whitespace-nowrap dark:text-white">
					<div class="hidden md:block">
						<button
							on:click={()=>profileOpen = !profileOpen}
							class="block dark:hover:bg-gray-700 p-2 rounded-md"
						>
							{#if data.user?.fullname} {data.user?.fullname} {:else} {data.user?.username} {/if}
						</button>
					</div>
					<div class="block md:hidden overflow-hidden rounded-full">
						<button
							on:click={()=>profileOpen = !profileOpen}
							class="justify-center items-center select-none w-8 h-8 border border-1 overflow-hidden rounded-full focus:outline-none dark:hover:bg-gray-700"
						>
							<svg class="object-cover" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
								<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
							</svg>
							<!-- {#if data.user?.fullname} {data.user?.fullname} {:else} {data.user?.username} {/if} -->
						</button>
					</div>

					<div
						class:hidden={!profileOpen}
						class="-translate-x-11 md:-translate-x-2 bg-gray-800 mt-3 rounded-md absolute origin-top-right divide-y block w-36 shadow-lg border dark:border-gray-700">
						<ul class="p-0">
							<li class="">
								<a class="block text-white px-3 py-2 dark:hover:bg-gray-700" href="#">User profile</a>
								<!-- <a class="block text-white px-3 py-2 dark:hover:bg-gray-500" href="#">Logout</a> -->
								<form action="/logout" method="POST">
									<button type="submit" class="border-t-2 border-t-gray-800 block w-full text-left text-white px-3 py-2 dark:hover:bg-gray-600">Logout</button>
								</form>
							</li>
						</ul>
					</div>
				</div>
				<!-- <form action="/logout" method="POST">
					<button
					class="hidden px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
					>Logout</button
					>
				</form> -->
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
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-700 md:p-0 md:dark:hover:text-lime-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
		color: greenyellow;
	}
</style>
