<script lang="ts">
	import { enhance } from '$app/forms';
	import { FORM_MODE_EDIT } from '../constants';
	import type { iSubnet } from '../models/subnet';

	export let dialog: HTMLDialogElement;
	export let submitSubnetForm: any;
	export let message: string | undefined | unknown = '';
	export let subnet: iSubnet;
	export let mode: string = FORM_MODE_EDIT;

	const isEditMode = (): boolean => mode === FORM_MODE_EDIT;
</script>

<div class="relative w-96 items-center mx-auto bg-gray-800 p-2 rounded-lg">
	<!-- Modal content -->
	<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
		<!-- Modal header -->
		<div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				{#if isEditMode()}
					Edit Subnet form
				{:else}
					New Subnet form
				{/if}
			</h3>
			<button
				on:click={() => dialog.close()}
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
				action="/subnets?/edit_subnet"
				method="POST"
				class="space-y-4 md:space-y-6"
				use:enhance={submitSubnetForm}
			>
				<div class="relative z-0 w-full mb-6 group">
					<input
						disabled={isEditMode()}
						bind:value={subnet.subnet}
						type="text"
						name="subnet"
						id="subnet"
						class="{isEditMode()
							? 'dark:text-gray-400'
							: 'dark:text-white'} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder={isEditMode() ? subnet.subnet : 'Enter an subnet name'}
					/>
					<label
						for="subnet"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Server Name</label
					>
				</div>
				{#if isEditMode()}
					<input type="hidden" bind:value={subnet.subnet} name="subnet" />
					<input type="hidden" bind:value={subnet.id} name="id" />
					<input type="hidden" bind:value={subnet.serverId} name="serverId" />
				{/if}
				<div class="relative z-0 w-full mb-6 group">
					<label
						for="subnet-description"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label
					>
					<textarea
						bind:value={subnet.description}
						name="subnet-description"
						id="subnet-description"
						rows="4"
						class="block p-2.5 w-full text-sm font-normal text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Write an subnet description here..."
					/>
				</div>
				<div class="block text-right">
					<button
						data-modal-hide="default-modal"
						type="submit"
						class="w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Update
					</button>
					<button
						on:click|preventDefault={() => dialog.close()}
						data-modal-hide="default-modal"
						type="button"
						class="ml-2 w-24 text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-gray-500 dark:focus:ring-blue-800"
						>Cancel
					</button>
				</div>
				{#if message}
					<p class="text-red-500">{message}!</p>
				{/if}
			</form>
		</div>
		<!-- Modal footer -->
	</div>
</div>
