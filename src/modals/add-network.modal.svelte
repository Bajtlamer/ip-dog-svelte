<script lang="ts">
	import { Pulse } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import { getStatusIcon } from '$lib/functions';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { URL_API_PING } from '../constants';
	import { authenticateUser } from '$lib/proxy';
	import type { ProxyServerInterface } from '../models/proxy';
		
	export let server: ProxyServerInterface ;

	let loading = false;

	let subnet: string = '';
	let devices: string[] = [];
	let count: number = 0;
	let message: string | undefined = '';

	const pingDevice = async (deviceString?: string, server?: ProxyServerInterface): Promise<boolean> => {
		if (!deviceString || !server) return false;
		
        // const _proxy = new ProxyServer(server);

		const token = await authenticateUser(server.username, server.password, server.hostname);
		
        if(!token) return false;
		
		const split = /\s/g.test(deviceString);
		let device = split ? deviceString.split(' ')[0] : deviceString;
		
		const res = await fetch(server.hostname + URL_API_PING + device, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: token
			}
		});

		if (res.ok === true) {
			const status = await res.json();
			return status.isAlive;
		} else {
			return false;
		}
	};

	const submitScanForm: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		for (const [key, value] of Object.entries(server)){
			formData.append(key, value);
		}

		loading = true;
		return async ({ result, update }) => {

			if (result.type === 'success') {

				const _data = result.data;

				if(_data) {
					if(_data?.count) {
						count = _data?.count;
						devices = _data?.devices;
					}
					
					if(_data?.server) {
						server = _data.server;
					}
					// devices.push('10.0.1.11');
					// devices.push('172.16.24.224');
					message = _data?.message;
				}
			}else if(result.type === 'failure') {
				message = result.data?.message;
				cancel();
			}

			loading = false;
		};
	};
</script>

<div class="items-center max-w-full mx-auto bg-gray-800 lg:p-4">
	<div
		class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700"
	>
			<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Add network
			</h1>

		<form
			action="/subnets?/subnets"
			method="POST"
			class="space-y-4 md:space-y-6"
			use:enhance={submitScanForm}
		>
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
			>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="text"
					name="subnet"
					id="subnet"
					value={subnet}
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Scan subnet..."
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Scan</button
				>
			</div>
		</form>

		<p class="pt-2 mb-3 font-normal text-gray-700 dark:text-gray-400">
			Please enter a subnet you are serarching for. For example '10.11.11.0/24'
		</p>

		{#if loading}
			<div class="flex items-center justify-center">
				<Pulse size="40" color="lightgreen" unit="px" duration="1s" />
			</div>
		{:else}
			{#if count}
				<h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
					Found {count} devices:
				</h2>
			{:else}
				<p class="mb-2 text-lg font-semibold text-red-700 dark:text-red-700">
					{message}
				</p>
			{/if}
			<ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
				{#each devices as device, index}
					<li class="flex items-center">
						{#await pingDevice(device, server)}
							<span class="pr-2">
								<Pulse size="19" color="lightgreen" unit="px" duration="1s" />
							</span>
						{:then isAlive}
							<svelte:component this={getStatusIcon(isAlive)} />
						{/await}
						<span class="pl-2">
							{device}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
