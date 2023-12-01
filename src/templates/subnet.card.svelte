<script lang="ts">
	import NetworkForm from './../modals/network-form.svelte';
	import SubnetNavArrow from './subnet.nav.arrow.svelte';
	import Modal from '../modals/modal.svelte';
	import ConfirmationDialog from '../modals/confirmation-dialog.svelte';
	import { clickOutside } from '$lib/event';
	import { ModalDialog } from '../models/modal';
	import { goto, invalidate } from '$app/navigation';
	import { getStatusIcon, getSubnetDeviceIcon, isValidIpAddress } from '$lib/functions';
	import { onMount } from 'svelte';
	import { ProxyServer } from '../models/proxy';
	import { CDevice } from '../models/device';
	import { deserialize } from '$app/forms';
	import { Pulse } from 'svelte-loading-spinners';
	import type { TServer } from '../models/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { CSubnet } from '../models/subnet';

	export let subnet: CSubnet;
	export let server: TServer;

	let delConfirmationDialog: HTMLDialogElement;
	let subnetFormDialog: HTMLDialogElement;
	let saveDropdownShow: boolean = false;
	let modal: ModalDialog = new ModalDialog();
	let deleting: boolean;
	let message: string = '';
	let loader: boolean = false;
	// let Subnet: CSubnet;
	let Server = new ProxyServer(server);
	let Device = new CDevice({
		subnetId: subnet.id || 0,
		address: subnet.subnet,
		status: subnet.status,
		description: subnet.description
	});

	onMount(async () => {
		Device.status = Server.isDeviceOnline(Device);
	});

	const subject = subnet.isSubnet() ? 'subnet' : 'device';

	modal = modal.createModalConfirmationDialog(
		'Delete ' + subject,
		`Are you sure you want to delete ${subject} with IP '${subnet.subnet}'?`,
		[
			{ text: 'Cancel', class: 'cancel', handler: () => delConfirmationDialog.close() },
			{
				text: 'Delete',
				class: 'bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-600',
				handler: () => deleteSubnet()
			}
		]
	);

	const showSubnetForm = () => {
		subnetFormDialog.showModal();
	};

	const onClickOutsideEventHandler = (event: MouseEvent) => {
		saveDropdownShow = false;
	};

	const onKeyUpEventHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			saveDropdownShow = false;
		}
	};

	const onClickDropDownMenuEventHandler = () => {
		saveDropdownShow = !saveDropdownShow;
	};

	const submitSubnetForm: SubmitFunction = async ({ formData, cancel }) => {
		console.log(formData);

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const data = result.data;

				if (data) {
					subnetFormDialog.close();
					await invalidate('server:subnets');
				}
			} else if (result.type === 'failure') {
				message = result.data?.message;
				cancel();
			}

			loader = false;
		};
	};

	const deleteSubnet = async () => {
		deleting = true;
		// await sleep(5000);
		console.log('start deleting subnet...', subnet.id);
		const data = new FormData();
		if (subnet.id) {
			data.set('subnetId', subnet.id?.toString());
		} else {
			return (modal = modal.createModalWarningDialog(
				'Delete Subnet',
				'Delete subnet failed. Exxpected an subnet ID, but got null'
			));
		}

		try {
			const response = await fetch('/subnets?/delete_subnet', {
				method: 'POST',
				body: data
			});

			const result: import('@sveltejs/kit').ActionResult = deserialize(await response.text());

			if (result.type === 'success') {

				delConfirmationDialog.close();
				await invalidate('server:subnets');

			} else if (result.type === 'failure') {
				modal = modal.createModalWarningDialog('Delete Server', 'Server deletion failed.');
			}
		} catch (error: any) {
			modal = modal.createModalWarningDialog('Delete Server', error?.message);
		}

		deleting = false;
	};
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse bg-gray-700xxx">
	<div class="flex-shrink-0">
		<svelte:component this={getSubnetDeviceIcon(subnet.subnet)} />
	</div>

	<div class="flex-1 min-w-0">
		<p class="inline-flex items-center text-md font-medium text-gray-900 truncate dark:text-white">
			{subnet.description}
			{#if subnet.devices?.length}
				<span class="flex text-white font-normal text-sm items-center gap-1 px-2">
					({subnet.devices?.length})
				</span>
			{/if}
		</p>
		<p class="flex text-xs text-gray-500 truncate dark:text-gray-400">
			{subnet.subnet}
		</p>
	</div>

	<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
		<div class="relative inline-block text-left" id="dropdown">
			<div id="button" class="rounded-lg hover:bg-gray-700 hover:border-gray-500">
				<div class="inline-flex items-center">
					{#if isValidIpAddress(subnet.subnet)}
						{#await Device.status}
							<span class="block pr-2">
								<Pulse size="19" color="lightgreen" unit="px" duration="1s" />
							</span>
						{:then isAlive}
							<span class="block pr-2">
								<svelte:component this={getStatusIcon(isAlive)} />
							</span>
						{/await}
					{:else}
						<a href={`/servers/${server.id}/${subnet.id}`} class="pr-2">
							<SubnetNavArrow />
						</a>
					{/if}
					<!-- <button class="bg-blue-500 px-3 py-1 rounded-md ml-5" on:click={()=>Device.status = Server.isDeviceOnline(Device)}>Probe</button> -->
					<button
						use:clickOutside={onClickOutsideEventHandler}
						on:keyup={onKeyUpEventHandler}
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
								d="M9 15.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm0-5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm0-5a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0Z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div
				class:hidden={!saveDropdownShow}
				class="w-48 hiden border border-gray-700 absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<div class="py-1 font-normal text-sm" role="none">
					<button
						disabled={subnet.isDevice()}
						on:click={() => goto(`/servers/${server.id}/${subnet.id}`)}
						type="submit"
						class="{!subnet.isDevice() ||
							'text-gray-700 hover:bg-gray-800'} font-normal block w-full px-4 py-2 text-left hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Show devices
					</button>
					<button
						on:click={showSubnetForm}
						type="submit"
						class="block w-full px-4 py-2 text-left hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Edit
					</button>
					<button
						disabled={!subnet.isDevice()}
						on:click={() => (Device.status = Server.isDeviceOnline(Device))}
						type="submit"
						class="{subnet.isDevice() ||
							'text-gray-700 hover:bg-gray-800'} block w-full px-4 py-2 text-left hover:bg-gray-700 border-b-2 border-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Probe device
					</button>
					<button
						on:click={() => delConfirmationDialog.showModal()}
						type="submit"
						class="block w-full px-4 py-2 text-left hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Delete Subnet
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- CONFIRMATION DIALOG -->
<Modal bind:dialog={delConfirmationDialog} on:close>
	<ConfirmationDialog dialog={delConfirmationDialog} {modal} />
</Modal>

<!-- SUBNET EDIT DIALOG -->
<Modal bind:dialog={subnetFormDialog} on:close>
	<NetworkForm {subnet} dialog={subnetFormDialog} {submitSubnetForm} />
</Modal>
