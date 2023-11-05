<script lang="ts">
	import { Pulse } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';

	import OkIconGrey from './../../templates/ok-icon-grey.svelte'
	import OkIconGreen from './../../templates/ok-icon-green.svelte'

	const url = 'https://ipdog-api.smes24.com/api/v1/';

	// export let form: ActionData;
	export let data;

	let loading = false;

	let subnet: string = '';
	let devices: string[] = [];
	let count: number = 0;
	let error: string | undefined = '';
	let userToken: string = data?.userToken;

	// console.log(data.userToken);

    const getStatusIcon = (status:boolean) => {
        return (status) ? OkIconGreen : OkIconGrey;
    }

	const pingDevice = async (userToken: string, deviceString?: string) => {
		if (!deviceString) return null;

        const split = /\s/g.test(deviceString);
        let device = (split) ? deviceString.split(' ')[0] : deviceString;
        console.log('IP:', device);
        
        // device = deviceString;
        
		const res = await fetch(url + 'ping/' + device, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: userToken
			}
		});

		if (res.ok === true) {
			const status = await res.json();
            // console.log(res)
			console.log('res', status.isAlive);
			return status.isAlive;
		} else {
			console.log('res', res);
			return null;
		}
	};

	let pingPromise = pingDevice(userToken);

	const submitScanForm: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		const req = Object.fromEntries(formData);
		// console.log(req?.subnet);

		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				console.log('->', subnet);

				const _data = result.data;
				subnet = _data?.subnet;
				devices = _data?.devices || [];
				devices.push('10.0.1.11');
				count = _data?.count || 0;
				error = _data?.error;
			}

			loading = false;
		};
	};
</script>

<div class="p-2 lg:p-20 h-screen items-center max-w-full mx-auto bg-gray-800">
	<div
		class="mx-auto max-w-screen-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700"
	>
		<a href="#">
			<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Search for subnet devices
			</h1>
		</a>

		<form
			action="?/subnets"
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

		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
			Please enter a subnet you are serarching for. For example '10.0.1.0/24'
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
					{error}
				</p>
			{/if}
			<ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
				{#each devices as device, index}
					<li class="flex items-center">
						{#await pingDevice(userToken, device)}
                        <span class="pr-2">
                            <Pulse size="19" color="lightgreen" unit="px" duration="1s" />
                        </span>
						{:then isAlive}
                            <svelte:component this={getStatusIcon(isAlive)} />
                        {/await}
                            {device}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>