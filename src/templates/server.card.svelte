<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { Pulse } from 'svelte-loading-spinners';
	import { getServerStatusIcon } from '$lib/functions.js';
	import { validateServer } from '$lib/proxy.js';
	import { browser } from '$app/environment';
	import { clickOutside } from '$lib/event';
	import Modal from '../modals/modal.svelte';
	import ConfirmationDialog from '../modals/confirmation-dialog.svelte';
	import { invalidate } from '$app/navigation';
	import { ModalDialog } from '../models/modal';
	import EditServerForm from '../modals/proxy-form.svelte';
	import NetworkIcon from './icons/network-icon.svelte';
	import type { ProxyServerInterface } from '../models/proxy';
	import DeviceIcon from './icons/device-icon.svelte';

	export let server: any;
	export let serverDropdownShow = false;
	// export let id: number;

	let modal: ModalDialog = new ModalDialog();
	let deleting: boolean = false;
	let confirmationDialog: HTMLDialogElement;
	let ProxyFormDialog: HTMLDialogElement;

	// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const close = () => confirmationDialog.close();

	const submitForm = async (event: HTMLFormElement) => {
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		// /** @type {import('@sveltejs/kit').ActionResult} */
		const result: import('@sveltejs/kit').ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidate('server:delete');
			ProxyFormDialog.close();
		}

		applyAction(result);
	};

	const getDevicesCount = (server: ProxyServerInterface) => {
		let count = 0;
		if ('subnets' in server && server.subnets) {
			server.subnets.forEach((subnet: any) => {
				count += subnet.devices.length;
			});
		}
		return count;
	};

	const onClickOutsideEventHandler = (event: MouseEvent) => {
		serverDropdownShow = false;
	};

	const onClickDropDownMenuEventHandler = () => {
		serverDropdownShow = !serverDropdownShow;
	};

	const onKeyUpEventHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			serverDropdownShow = false;
		}
	};

	const newSubnetMenuClick = () => {
		modal = modal.createModalWarningDialog('Add Subnet', 'Add a new subnet to this server.');
		confirmationDialog.showModal();
	};

	const editProxyServerMenuClick = () => {
		modal = modal.createModalInfoDialog('Edit Proxy Server', 'Edit existing Proxy Server.');
		confirmationDialog.showModal();
	};

	const deleteProxyServerMenuClick = () => {
		modal = modal.createModalConfirmationDialog(
			'Delete Server',
			`Are you sure you want to delete server '${server.name}'? This operation cannot be undone.`,
			[
				{ text: 'Cancel', class: 'cancel', handler: () => confirmationDialog.close() },
				{
					text: 'Delete',
					class: 'bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-600',
					handler: () => deleteServer()
				}
			]
		);

		confirmationDialog.showModal();
		console.log('Delete menu_click');
	};

	const deleteServer = async () => {
		deleting = true;
		// await sleep(5000);
		// console.log('success');
		const data = new FormData();
		data.set('serverId', server.id);

		const response = await fetch('?/delete_server', {
			method: 'POST',
			body: data
		});

		const result: import('@sveltejs/kit').ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidate('server:delete');
			// confirmationDialog.close();
		} else if (result.type === 'failure') {
			modal = modal.createModalWarningDialog('Delete Server', 'Server deletion failed.');
			// dialog.close();
		}

		deleting = false;
	};
</script>

<div
	class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
	<div class="flex items-center justify-between" id="outside">
		<h5 class=" w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{server.name}
		</h5>
		<div class="relative inline-block text-left">
			<div id="button">
				<button
					use:clickOutside={onClickOutsideEventHandler}
					on:click={onClickDropDownMenuEventHandler}
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
					<!-- <form method="POST" action="?/delete_server" role="none" use:enhance|preventDefault={success}> -->
					<button
						on:click={() => ProxyFormDialog.showModal()}
						type="submit"
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Edit Server
					</button>
					<!-- </form> -->
					<button
						on:click={deleteProxyServerMenuClick}
						on:keyup={deleteProxyServerMenuClick}
						type="submit"
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Delete Server
					</button>
					<button
						on:click={newSubnetMenuClick}
						on:keyup={newSubnetMenuClick}
						type="submit"
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>New Subnet
					</button>
				</div>
			</div>
		</div>
	</div>

	<span class="block mb-2 text-xs text-white">{server.hostname}</span>
	<p class="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
		{server.description}
		<span class="pl-2 pr-1">
			<NetworkIcon size="14" />
		</span>
		{server.subnets.length}
		<span class="pl-2 pr-1">
			<DeviceIcon size="15" />
		</span>
		{getDevicesCount(server)}
	</p>

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
	</div>
</div>

<!-- PROXY SERVER EDIT DIALOG -->
<Modal bind:dialog={ProxyFormDialog}>
	<EditServerForm mode="edit" dialog={ProxyFormDialog} {submitForm} {server} />
</Modal>

<!-- PROXY SERVER DELETE CONFIRM DIALOG -->
<Modal bind:dialog={confirmationDialog}>
	<ConfirmationDialog {modal} on:close={close} />
</Modal>

<!-- <Modal bind:dialog={ProxyFormDialog} on:close>
	<EditServerForm on:SaveProxyServer={updateProxy} {server} dialog={ProxyFormDialog} />
</Modal> -->
