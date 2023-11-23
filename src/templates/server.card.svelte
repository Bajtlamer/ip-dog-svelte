<script lang="ts">
	import { Pulse } from 'svelte-loading-spinners';
	import { getServerStatusIcon } from '$lib/functions.js';
	import { validateServer } from '$lib/proxy.js';
	import { browser } from '$app/environment';
	import DeleteServerIcon from '../templates/icons/server-icon-delete.svelte';
	export let server: any;
	export let serverDropdownShow = false;
</script>

<div 
	class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
	<div class="flex items-center justify-between">
		<h5 class=" w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{server.name}
		</h5>
		<div class="relative inline-block text-left">
			<div>
				<button
					on:click={() => {
						serverDropdownShow = !serverDropdownShow;
					}}
					type="button"
					class="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-600 hover:ring-1"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
						><path
							fill="white"
							d="M14 10.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm-5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm-5 0a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0Z"
						/>
					</svg>
				</button>
			</div>

			<div
				class:hidden={!serverDropdownShow}
				class="hiden border border-gray-700 absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<div class="py-1" role="none">
                    <a
                    href="#"
                    class="block px-4 py-2 text-sm hover:bg-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2">Edit Server</a
					>
					<form method="POST" action="#" role="none">
                        <button
                        type="submit"
                        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-3">Delete Server</button
						>
					</form>
                    <a
                        href="#"
                        class="block px-4 py-2 text-sm hover:bg-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0">Clear Subnets</a
                    >
				</div>
			</div>
		</div>
	</div>

	<span class="block mb-2 text-xs text-white">{server.hostname}</span>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{server.description}</p>

	<div class="relative flex justify-between">
		<a
			href="/servers/{server.id}"
			class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Connect
			<svg
				class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 10"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 5h12m0 0L9 1m4 4L9 9"
				/>
			</svg>
		</a>
		<span class="pr-2">
			{#if browser}
				{#await validateServer(server)}
					<span>
						<Pulse size="20" color="lightgreen" unit="px" duration="1s" />
					</span>
				{:then isAlive}
					<svelte:component this={getServerStatusIcon(isAlive)} />
				{/await}
			{/if}
		</span>

		<!-- <button class="px-1 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"> -->
		<!-- </button> -->
	</div>
</div>
