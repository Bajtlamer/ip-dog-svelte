<script lang="ts">
	import { enhance } from '$app/forms';
	// import { createEventDispatcher } from 'svelte';
	import { FORM_MODE_EDIT } from '../constants';
	import type { iDevice } from '../models/device';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidate, invalidateAll } from '$app/navigation';

	// export let submitDeviceForm: any;
	export let dialog: HTMLDialogElement;
	export let message: string | undefined | unknown = '';
	export let device: iDevice;
	export let mode: string = FORM_MODE_EDIT;
	export let submitDeviceForm: SubmitFunction;

	const isEditMode = (): boolean => mode === FORM_MODE_EDIT;
	// const dispatch = createEventDispatcher();

    // const submitDeviceForm: SubmitFunction = async ({ formData, cancel }) => {
    //     console.log('submitting device form...');

    //     return async ({ result, update }) => {
	// 		// console.log('RESULT:',result)
	// 		if (result.type === 'success') {
	// 			const data = result.data;

	// 			if (data) {
	// 				console.log(data?.device)
	// 				dialog.close();
	// 				// await invalidate('subnet:devices');
	// 				await invalidateAll();
	// 				// update()
	// 			}
	// 		} else if (result.type === 'failure') {
	// 			console.log('canceling')
	// 			message = result.data?.message;
	// 			cancel();
	// 		}

	// 		// loader = false;
	// 	};

    // };
</script>

<div class="relative w-96 items-center mx-auto bg-gray-800 p-2 rounded-lg">
	<!-- Modal content -->
	<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
		<!-- Modal header -->
		<div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				{#if isEditMode()}
					Edit Devce form
				{:else}
					New Device form
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
				action="/devices?/edit"
				method="POST"
				class="space-y-4 md:space-y-6"
				use:enhance={submitDeviceForm}
			>
				<div class="relative z-0 w-full mb-6 group">
					<input
						disabled={isEditMode()}
						bind:value={device.address}
						type="text"
						name="address"
						id="address"
						class="{isEditMode()
							? 'dark:text-gray-400'
							: 'dark:text-white'} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder={isEditMode() ? device.address : 'Enter an IP address'}
					/>
					<label
						for="address"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Device IP address
					</label>
				</div>
				{#if isEditMode()}
					<input type="hidden" bind:value={device.address} name="address" />
					<input type="hidden" bind:value={device.id} name="deviceId" />
					<input type="hidden" bind:value={device.subnetId} name="subnetId" />
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
						data-modal-hide="default-modal"
						type="submit"
						class="w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
