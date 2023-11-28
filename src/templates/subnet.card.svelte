<script lang="ts">
	import { clickOutside } from '$lib/event';
	import Modal from '../modals/modal.svelte';
	import type { Subnet } from '../models/proxy';
	import ConfirmationDialog from '../modals/confirmation-dialog.svelte';
	import { ModalDialog } from '../models/modal';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { getStatusIcon, getSubnetDeviceIcon, validateIPaddress } from '$lib/functions';
	import { Pulse } from 'svelte-loading-spinners';
	import { pingDevice } from '$lib/service/network.service';
	import type { TServer } from '../models/types';
	import { browser } from '$app/environment';

	export let subnet: Subnet;
	// export let serverIdw: number;
	export let server: TServer;

	let delConfirmationDialog: HTMLDialogElement;
	let saveDropdownShow: boolean = false;
	let modal: ModalDialog = new ModalDialog();
	let deleting: boolean;

	modal = modal.createModalConfirmationDialog(
		'Delete Subnet',
		`Are you sure you want to delete subent '${subnet.subnet}'?`,
		[
			{ text: 'Cancel', class: 'cancel', handler: () => delConfirmationDialog.close() },
			{
				text: 'Delete',
				class: 'bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-600',
				handler: () => deleteSubnet()
			}
		]
	);

	const onClickOutsideEventHandler = (event: MouseEvent) => {
		// console.log('clicked_outside', event);
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

	const deleteSubnet = async () => {
		deleting = true;
		// await sleep(5000);
		console.log('start deleting subnte...');
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
				await invalidate('/servers/' + server.id);
				// await invalidateAll();
				console.log('Invalidate URL:', '/servers/' + server.id);
				applyAction(result);
			} else if (result.type === 'failure') {
				modal = modal.createModalWarningDialog('Delete Server', 'Server deletion failed.');
				// delConfirmationDialog.close();
			}
		} catch (error: any) {
			modal = modal.createModalWarningDialog('Delete Server', error?.message);
		}

		deleting = false;
	};
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse bg-gray-700xxx">
	<div class="flex-shrink-0">
		<svelte:component this={getSubnetDeviceIcon(subnet?.subnet)} />
	</div>

	<div class="flex-1 min-w-0">
		<p class="inline-flex items-center text-sm font-medium text-gray-900 truncate dark:text-white">
			{subnet.subnet}
			<!-- {#await pingDevice(subnet.subnet, server)}
                <span class="pr-2">
                    <Pulse size="19" color="lightgreen" unit="px" duration="1s"/>
                </span>
            {:then isAlive}
            <span class="pl-2">
                <svelte:component this={getStatusIcon(isAlive)}/>
            </span>
            {/await} -->
		</p>
		<p class="text-sm text-gray-500 truncate dark:text-gray-400">
			{subnet.description}
		</p>
	</div>

	<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
		<div class="relative inline-block text-left" id="dropdown">
			<div id="button" class="rounded-lg hover:bg-gray-700 hover:border-gray-500">
                <div class="inline-flex items-center">
                    {#if (validateIPaddress(subnet?.subnet)) && browser}
					{#await pingDevice(subnet.subnet, server)}
						<span class="pr-2">
							<Pulse size="19" color="lightgreen" unit="px" duration="1s" />
						</span>
					{:then isAlive}
						<span class="pl-2">
							<svelte:component this={getStatusIcon(isAlive)} />
						</span>
					{/await}
                    {/if}

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
				<div class="py-1" role="none">
					<a
						href={`/servers/${server.id}/${subnet.id}`}
						type="submit"
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						>Show subnet devices
					</a>
					<button
						on:click={() => delConfirmationDialog.showModal()}
						type="submit"
						class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
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

<Modal bind:dialog={delConfirmationDialog} on:close>
	<ConfirmationDialog dialog={delConfirmationDialog} {modal} />
</Modal>
