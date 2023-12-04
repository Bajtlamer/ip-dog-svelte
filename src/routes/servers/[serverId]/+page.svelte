<script lang="ts">
	import Modal from '../../../modals/modal.svelte';
	import type { PageData } from './$types';
	import NewServerScan from '../../../modals/add-network.modal.svelte';
	import Subnet from '../../../templates/subnet.card.svelte';
	import { CSubnet } from '../../../models/subnet';

	export let data: PageData;

	// let subnet: string;
	let serverScanDialog: HTMLDialogElement;

	$: ({ server } = data);


	const closeDialog = () => {
		serverScanDialog.close();
	};

</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
	<div
		class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700"
	>
		<div class="flex items-center justify-between w-full">
			<a
				href="/servers/"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				&larr; Back
			</a>
			<h1 class="text-2xl font-bold text-white">SUBNETS</h1>
			<button
				on:click={() => serverScanDialog.showModal()}
				class="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
			>
				Add network
			</button>
		</div>

		<h1 class="pt-4 text-2xl font-bold text-white">{server.name}</h1>
		<p class="text-white text-xs">{server.hostname}</p>
		<h4 class="text-white font-bold pt-4">
			Description:&nbsp;&nbsp;<span class="text-sm font-normal text-white dark:text-white"
				>{server?.description}</span
			>
		</h4>

		<h2 class="pt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
			Server subnets: {server.subnets?.length}
		</h2>
		<ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
			{#if server.subnets}
				{#each server.subnets as subnet, index}
					<li
						class:mb-1={server.subnets?.length - 1 > index}
						id={index.toString()}
						class="py-3 px-3 sm:py-4 bg-slate-700 border-gray-600 rounded-md"
					>
						<Subnet subnet={new CSubnet(subnet)} {server} />
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<!-- NEW SUBNET SCAN DIALOG -->
<Modal bind:dialog={serverScanDialog} on:close>
	<NewServerScan {closeDialog} {server} />
</Modal>
