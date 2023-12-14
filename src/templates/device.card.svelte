<script lang="ts">
	import { clickOutside } from '$lib/event';
	import { getDeviceTypeIcon, getStatusIcon } from '$lib/functions';
	import { Pulse } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';
	import { ProxyServer, type ProxyServerInterface } from '../models/proxy';
	import Modal from '../modals/modal.svelte';
	import DeviceForm from './../modals/device-form.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { iDevice } from '../models/device';
	import ConfirmationDialog from '../modals/confirmation-dialog.svelte';
	import { ModalDialog } from '../models/modal';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';

	export let device: iDevice;
	export let iServer: ProxyServerInterface | null;

	let deleteDeviceDialog: HTMLDialogElement;
	let deviceFormDialog: HTMLDialogElement;
	let toggleDropDown: boolean = false;
	let message: string = '';
	let serverId: number | null;
	let modal: ModalDialog = new ModalDialog();

	$: server = new ProxyServer(iServer);
	$: deviceUrl = 'http://' + device.address;
	$: device.status = server.isDeviceOnline(device);

	const onKeyUpEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			toggleDropDown = false;
		}
	};

	onMount(async () => {
		device.status = server.isDeviceOnline(device);
		serverId = server.id;
	});

	const showDeviceEditForm = (event: Event) => {
		deviceFormDialog.showModal();
	};

	/** ! Need to solve the issue with the deviceFormDialog **/

	const submitDeviceForm: SubmitFunction = async ({ formData, cancel }) => {
		console.log('submitting device form...');

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const data = result.data;
				if (data) {
					// await invalidate('subnet:devices');
					// server = new ProxyServer(data.server)
					// device = new CDevice(data.device);
					// device = data.device;
					// device.description = "Blabol"
					// device.address = "172.16.24.20"
					device.status = server.isDeviceOnline(device);
					// console.log(data);
					deviceFormDialog.close();
					// update()
					// applyAction(result);
					// await invalidateAll();
				}
			} else if (result.type === 'failure') {
				message = result.data?.message;
				console.log(message)
				// update();
			}

			// loader = false;
		};
	};

	const deleteDevice = async () => {
		const data = new FormData();

		if (device.id) {
			data.set('deviceId', device.id.toString());
		} else {
			modal = modal.createModalWarningDialog(
				'Delete Device',
				'Device deletion failed. Device ID is missing.'
			);

			deleteDeviceDialog.showModal();
		}

		const response = await fetch('/devices?/delete', {
			method: 'POST',
			body: data
		});

		const result: import('@sveltejs/kit').ActionResult = deserialize(await response.text());
		// console.log('response:', result)
		if (result.type === 'success') {
			// console.log('success', result.data);
			await invalidate('subnet:devices');

			deleteDeviceDialog.close();
			// applyAction(result);
			// await invalidateAll();
		} else if (result.type === 'failure') {
			message = result.data?.message;
			// dialog.close();
		}
	};

	const openDialog = () => {
		// console.log('opening dialog...', device)
		let deviceDescription = device.description;

		if(deviceDescription === null || deviceDescription === undefined || deviceDescription === '') {
			deviceDescription = 'with IP ' + device.address;
		}

		modal = modal.createModalConfirmationDialog(
			'Delete device',
			`Are you sure you want to delete device ${deviceDescription}?`,
			[
				{ text: 'Cancel', class: 'cancel', handler: () => deleteDeviceDialog.close() },
				{
					text: 'Delete',
					class: 'bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-600',
					handler: () => deleteDevice()
				}
			]
		);
		deleteDeviceDialog.showModal();
	};
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse bg-gray-700">
	<div class="flex-shrink-0">
		<svelte:component this={getDeviceTypeIcon(device.address)} />
	</div>

	<div class="flex-1 min-w-0">
		<p class="inline-flex items-center text-md font-medium text-gray-900 truncate dark:text-white">
			{device.description}
		</p>
		<p class="flex text-xs text-gray-500 truncate dark:text-gray-400">
			<a target="_blank" href={deviceUrl}>
				{device.hostname} ({device.address})
			</a>
		</p>
	</div>

	<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
		<div class="relative inline-block text-left" id="dropdown">
			<div id="button" class="rounded-lg hover:bg-gray-700 hover:border-gray-500">
				<div class="inline-flex items-center">
					<!-- {#if isValidIpAddress(device.address)} -->
					{#await device.status}
						<span class="block pr-0 md:pr-2">
							<Pulse size="19" color="lightgreen" unit="px" duration="1s" />
						</span>
					{:then isAlive}
						<span class="block pr-0 md:pr-2">
							<svelte:component this={getStatusIcon(isAlive)} />
						</span>
					{/await}
					<!-- {:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="red"
								d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
							/>
						</svg>
					{/if} -->
					<!-- <button class="bg-blue-500 px-3 py-1 rounded-md ml-5" on:click={()=>Device.status = Server.isDeviceOnline(Device)}>Probe</button> -->
					<button
						use:clickOutside={() => (toggleDropDown = false)}
						on:keyup={onKeyUpEscape}
						on:click={() => (toggleDropDown = !toggleDropDown)}
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
				class:hidden={!toggleDropDown}
				class="w-48 hiden border border-gray-700 absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<div class="py-1 font-normal text-sm" role="none">
					<button
						on:click={showDeviceEditForm}
						type="submit"
						class="block w-full px-4 py-2 text-left hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Edit
					</button>
					<button
						on:click={() => (device.status = server.isDeviceOnline(device))}
						type="submit"
						class="block w-full px-4 py-2 text-left hover:bg-gray-700 border-b-2 border-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Probe device
					</button>
					<button
						on:click={openDialog}
						type="submit"
						class="block w-full px-4 py-2 text-left hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Delete Device
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- SUBNET EDIT DIALOG -->
<Modal bind:dialog={deviceFormDialog}>
	<DeviceForm
		mode="edit"
		dialog={deviceFormDialog}
		{message}
		{device}
		{submitDeviceForm}
		{serverId}
	/>
</Modal>

<!-- CONFIRM DEVICE DELETE DIALOG -->
<Modal bind:dialog={deleteDeviceDialog} on:close>
	<ConfirmationDialog on:close={() => deleteDeviceDialog.close()} {modal} />
</Modal>
