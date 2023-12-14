<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { FORM_MODE_EDIT, FORM_MODE_NEW } from '../constants';
	import type { iDevice } from '../models/device';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Modal from './modal.svelte';
	import { isValidIpAddress } from '$lib/functions';

	// export let submitDeviceForm: any;
	export let dialog: HTMLDialogElement;
	export let message: string | undefined | unknown = '';
	export let device: iDevice;
	export let mode: string = FORM_MODE_EDIT;
	export let submitDeviceForm: SubmitFunction;
	export let serverId: number | null;

	let disabled: boolean = false;

	const isEditMode = (): boolean => mode === FORM_MODE_EDIT;

	onMount(() => {
		if (mode !== FORM_MODE_EDIT && mode !== FORM_MODE_NEW) {
			console.log(
				'Device edit form ERROR, invalid action mode. Has expected edit or new, but got ' + mode
			);
		}
	});

	const deviceIpAddressHandler = (event: KeyboardEvent) => {
		if(isEditMode()) return;

		const target = event.target as HTMLInputElement;
		const value = target.value;
		message = '';
		const isValidAddress = isValidIpAddress(value);

		if (isValidAddress) {
			device.address = value;
			disabled = false;
		} else {
			disabled = true;
		}
	};
</script>

<div class="relative w-96 items-center mx-auto bg-gray-800 p-2 rounded-lg">
	<!-- Modal content -->
	<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
		<!-- Modal header -->
		<div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				{#if isEditMode()}
					Edit device
				{:else}
					Create new device
				{/if}
			</h3>
			<button
				on:click|preventDefault={() => dialog.close()}
				type="button"
				class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="default-modal"
			>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</button>
		</div>
		<!-- Modal body -->
		<div class="p-5 space-y-4">
			<form
				action="/devices?/{mode}"
				method="POST"
				class="space-y-4 md:space-y-6"
				use:enhance={submitDeviceForm}
			>
				<div class="relative z-0 w-full mb-6 group">
					<input
						on:keyup={deviceIpAddressHandler}
						disabled={isEditMode()}
						bind:value={device.address}
						type="text"
						name="address"
						id="address"
						class="
							{isEditMode()
							? 'dark:text-gray-400'
							: 'dark:text-white'}
							{disabled?'dark:border-red-500 dark:focus:border-red-500':'dark:border-gray-600 dark:focus:border-blue-500'} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						for="address"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Device IP address
					</label>
				</div>
				<div class="relative z-0 w-full mb-6 group">
					<input
						bind:value={device.hostname}
						type="text"
						name="hostname"
						id="hostname"
						class="{isEditMode()
							? 'dark:text-gray-400'
							: 'dark:text-white'} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						for="address"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Device hostname
					</label>
				</div>
				{#if isEditMode()}
					<input type="hidden" bind:value={device.address} name="address" />
					<input type="hidden" bind:value={device.id} name="deviceId" />
					<input type="hidden" bind:value={device.subnetId} name="subnetId" />
					<input type="hidden" bind:value={serverId} name="serverId" />
				{:else}
					<input type="hidden" bind:value={device.subnetId} name="subnetId" />
					<input type="hidden" bind:value={serverId} name="serverId" />
				{/if}
				<div class="relative z-0 w-full mb-6 group">
					<label
						for="subnet-description"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label
					>
					<textarea
						bind:value={device.description}
						name="device-description"
						id="device-description"
						rows="4"
						class="block p-2.5 w-full text-sm font-normal text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Write an device description here..."
					/>
				</div>
				<div class="block text-right">
					<button
						disabled={disabled}
						data-modal-hide="default-modal"
						type="submit"
						class="{disabled?'dark:bg-gray-600 dark:hover:bg-gray-600':'dark:bg-blue-600 dark:hover:bg-blue-700'} w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:focus:ring-blue-800"
						>Save
					</button>
					<!-- <button
						on:click|preventDefault={() => dialog.close()}
						data-modal-hide="default-modal"
						type="button"
						class="ml-2 w-24 text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-gray-500 dark:focus:ring-blue-800"
						>Cancel
					</button> -->
				</div>
				{#if message}
					<p class="text-red-500">{message}!</p>
				{/if}
			</form>
		</div>
		<!-- Modal footer -->
	</div>
</div>
