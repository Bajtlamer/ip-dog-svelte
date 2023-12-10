<script lang="ts">
	import type { PageData } from './$types';
	import SearchDevices from '../../templates/search.devices.svelte';
	import { onMount } from 'svelte';
	import type { IDevice } from '../../models/device';

	export let data: PageData;
	let searching: string = '';
	let items: IDevice[] = [];
	let excludedKeys: string[] = ['owner', 'id', 'subnetId'];

	$: devices = data.devices;
	$: devicesCount = data.devices.length;

	const searchHandler = (event: CustomEvent<string>) => {
		searching = event.detail;

		if (devices.length === 0) return;

		items = devices.filter((device: IDevice) => {
			return Object.keys(device).some((key) => {
				return (excludedKeys.includes(key)) ? false : device[key as keyof IDevice]?.toString().toLocaleLowerCase().indexOf(searching) !== -1;
			});
		});

		devicesCount = items.length;
	};

	onMount(() => {
		items = devices;
	});

</script>

<div class="items-center min-h-screen max-w-full mx-auto bg-gray-800 lg:p-20">
	<div class="block max-w-screen-sm mx-auto px-2">
		<h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Search for Devices
		</h1>
		<span class="text-xs text-white">Found devices: {devicesCount}</span>
	</div>
	<div class="block max-w-screen-sm mx-auto pb-4 px-1">
		<SearchDevices on:onSearch={searchHandler} {searching} />
	</div>

	<div
		class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700"
	>
		{#if devicesCount > 0}
			<ul>
				{#each items as device, index}
					<li class:border-b={devicesCount - 1 > index} class=" border-gray-600">
						<dl class="max-w-md text-gray-900 dark:text-white">
							<div class="flex flex-col py-3">
								<dd class="text-lg font-semibold">
									<a href={`/servers/${device.owner.serverId}/${device.subnetId}`}>
										{#if device.description}
											{device.description}
										{:else}
											N/A
										{/if}
									</a>
								</dd>
								<dt class="text-gray-500 md:text-md dark:text-gray-400">
									<a href={`/servers/${device.owner.serverId}/${device.subnetId}`}>
										{device.hostname}
										<span class="text-sm">
											({device.address})
										</span>
									</a>
								</dt>
							</div>
						</dl>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="text-gray-900 dark:text-white">No result found</div>
		{/if}
	</div>
</div>
