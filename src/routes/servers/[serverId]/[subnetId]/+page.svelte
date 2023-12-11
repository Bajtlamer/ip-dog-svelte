<script lang="ts">
	import NetworkIcon from './../../../../templates/icons/network-icon.svelte';
	import type { PageData } from './$types';
	import DeviceCard from '../../../../templates/device.card.svelte';
	import { CDevice } from '../../../../models/device';
	import { onMount } from 'svelte';

	export let data: PageData;

	let dialog: HTMLDialogElement;
	let serverId: number = data.serverId;
	let devicesCount: number = 0;

	$: ({ subnet } = data);
	$: ({ server } = data);
	$: { if (subnet) {
			if ('devices' in subnet) {
				if (Array.isArray(subnet.devices)) {
					devicesCount = subnet.devices.length;
				}
			}
		}
	}

    // onMount(async () => {
	// 	devicesCount = subnet.devices.length;
	// });


</script>

<div class="items-center min-h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
	<!-- <h1 class="text-2xl font-bold text-white">DEVICES</h1> -->
	<div
		class="max-w-screen-sm p-2 md:p-4 lg:p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700"
	>
		<div class="flex items-center justify-between w-full">
			<a
				href="/servers/{serverId}/"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				&larr; Back
			</a>
			<!-- <h1 class="text-2xl font-bold text-white">DEVICES</h1> -->
			<button
				on:click={() => dialog.showModal()}
				class="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
			>
				Add network
			</button>
		</div>
		<div class="p-2">

			<h1 class="pt-4 text-2xl font-bold text-white">{subnet.description}</h1>
			<div class="flex text-white text-xs items-center">
				<NetworkIcon size="14" />
				<span class="pl-1">{subnet.subnet}</span>
			</div>
			<!-- <h4 class="text-white text-sm font-bold pt-4">Description:</h4>
				<p class="font-normal text-gray-700 dark:text-gray-400">{Subnet?.description}</p> -->
				<h2 class="pt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">Devices list:</h2>
			</div>
		<ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
			<!-- {#if Subnet?.devices} -->
			{#each subnet.devices as device, index}
				<li
					class:mb-1={devicesCount - 1 > index}
					id={index.toString()}
					class="py-3 pl-3 md:px-3 bg-slate-700 border-gray-600 rounded-md"
				>
					<!-- {device.description} -->
					<DeviceCard {device} iServer={server} />
				</li>
			{/each}
			<!-- {/if} -->
		</ul>
	</div>
</div>
