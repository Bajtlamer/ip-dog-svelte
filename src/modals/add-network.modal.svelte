<script lang="ts">
	import { Pulse } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import { getStatusIcon, isValidIpAddress, isValidNetworkSubnet } from '$lib/functions';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ProxyServerInterface } from '../models/proxy';
	import { pingDevice } from '$lib/service/network.service';
	import { clickOutside } from '$lib/event';
	import Modal from './modal.svelte';
	import SaveSubnetResult from '../modals/save-subnet-result.modal.svelte';
	import { CDevice, type iDevice } from '../models/device';
	import { CSubnet, type iSubnet } from '../models/subnet';
	import { invalidate } from '$app/navigation';
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let server: ProxyServerInterface;
	// export let showSubnetModal: MouseEventHandler<HTMLButtonElement>;
	let saveSubnetDialog: HTMLDialogElement;
	export let closeDialog: Function;
	// console.log('server', server);

	let loading = false;

	let subnet: string = '';
	let devices: string[] = [];
	let count: number = 0;
	let message: string | undefined = '';
	let saveDropdownShow: boolean = false;
	let disabled = false;

	let form: Record<string, any> | undefined = {};

	const onClickOutsideEventHandler = (event: MouseEvent) => {
		saveDropdownShow = false;
	};

	const addDevice = async (device: CDevice) => {
		// console.log('add device', device);
		const response = await fetch('/api/devices', {
			method: 'POST',
			body: JSON.stringify(device.toArray()),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await response.json();
	};

	// const saveDevicesToSubnet = (devices: string[], subnet: CSubnet) => {
	// 	// const serverId = server.id;
	// 	const subnetId = subnet.id;

	// 	if (subnet.isSubnet() && devices.length > 0) {
	// 		devices.forEach((address: string) => {
	// 			const dev = { address, subnetId };
	// 			const res = addDevice(new CDevice(dev));
    //             console.log('add device response:', res);
    //             invalidate('/servers/' + server.id);
	// 		});
	// 	}
    //     return;
	// };

	const submitScanResultForm: SubmitFunction = async ({formData, cancel }) => {
		const serverId = server.id?.toString();
		if (!serverId) {
			message = 'Save subnet failed, empty server ID!';
			return;
		}
		formData.set('serverId', serverId);
		// formData.append('devices', devices);

		console.log('server ID:', serverId);
		// console.log('devices:', devices);

		return async ({ result, update }) => {
			if (result.type === 'success') {

				const response = result.data;
				console.log('result:', response?.subnet);

				if (response) {
					const subnetId = response.subnet.id;
                    console.log('subnet ID:', subnetId);
					saveSubnetDialog.close();
					closeDialog();
                    console.log(devices.length);
                    // if (subnet.isSubnet() && devices.length > 0) {
					// saveDevicesToSubnet(devices, new CSubnet(response.subnet));

                    const subnet:CSubnet = new CSubnet(response.subnet)


                    // const subnetId:number = subnet.id;

                    if (subnet.isSubnet() && devices.length > 0) {
                        for await(const address of devices) {
                            const dev = { address, subnetId };

                            const device = new CDevice(dev);

                            const response = await fetch('/api/devices', {
                                method: 'POST',
                                body: JSON.stringify(device.toArray()),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            const res = await response.json();


                            console.log('add device response:', res);
                            invalidate('/servers/' + server.id);
                        };
                    }


                    // }
					await update();
				}
			} else if (result.type === 'failure') {
				console.log('failure:', result);
				form = result.data;
				message = result.data?.message;
				cancel();
			}

			loading = false;
		};
	};

	const showSubnetSaveForm = () => {
		form = {};
		// message = '';
		saveSubnetDialog.showModal();
	};

	const onKeyUpEventHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			saveDropdownShow = false;
		}
	};

	const onClickDropDownMenuEventHandler = () => {
		saveDropdownShow = !saveDropdownShow;
	};

	const subnetFormatHandler = (event: KeyboardEvent) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		const isSubnet = isValidNetworkSubnet(value);
		const isValidAddress = isValidIpAddress(value);

		if (isSubnet || isValidAddress || value === '') {
			subnet = value;
			disabled = false;
		} else {
			disabled = true;
		}
	};

	// const submitSubnetWithDevices: SubmitFunction = ({formElement, formData, action, cancel, submitter}) => {

	// };

	const submitScanForm: SubmitFunction = ({ formData, cancel }) => {
		for (const [key, value] of Object.entries(server)) {
			formData.append(key, value);
		}

		loading = true;

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const _data = result.data;

				if (_data) {
					if (_data?.count) {
						count = _data?.count;
						devices = _data?.devices;
					}

					if (_data?.server) {
						server = _data.server;
					}
					// devices.push('10.0.1.11');
					// devices.push('172.16.24.224');
					message = _data?.message;
				}
			} else if (result.type === 'failure') {
				message = result.data?.message;
				cancel();
			}

			loading = false;
		};
	};
</script>

<div class="items-center mx-auto bg-gray-800 p-0 md:p-2 rounded-lg">
	<div
		class="p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700"
	>
		<h1 class="sm:text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Subnet scan <span class="text-sm font-normal">({server.name})</span>
		</h1>

		<form
			action="/subnets?/subnets"
			method="POST"
			class="space-y-4 md:space-y-6"
			use:enhance={submitScanForm}
		>
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
			>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					on:keyup={subnetFormatHandler}
					class:dark:border-red-500={disabled}
					bind:value={subnet}
					type="text"
					name="subnet"
					id="subnet"
					class="{disabled?'dark:border-red-500':'dark:border-gray-300'} focus:outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
					placeholder="Scan subnet..."
				/>
				<button
					disabled={disabled}
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Scan
				</button>
			</div>
		</form>

		<p class="pt-2 mb-3 font-normal text-sm md:w-96 text-gray-700 dark:text-gray-400">
			Please enter a subnet, or IP e.g. '10.11.11.0/24'
		</p>

		{#if loading}
			<div class="flex items-center justify-center">
				<Pulse size="40" color="lightgreen" unit="px" duration="1s" />
			</div>
		{:else}
			{#if count}
				<div class="mb-2 flex items-center justify-between h-14">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
						Found {count} devices:
					</h2>
					<div class="relative inline-block text-left" id="dropdown">
						<div id="button" class="rounded-lg hover:bg-gray-700 hover:border-gray-500">
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

						<div
							class:hidden={!saveDropdownShow}
							class="hiden border border-gray-700 absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<div class="py-1" role="none">
								<button
									on:click={showSubnetSaveForm}
									type="submit"
									class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-2"
									>Save result
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<p class="mb-2 text-lg font-semibold text-red-700 dark:text-red-700">
					{message}
				</p>
			{/if}
			<ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
				{#each devices as device, index}
					<li id={index.toString()} class="flex items-center">
						{#await pingDevice(device, server)}
							<span class="pr-2">
								<Pulse size="19" color="lightgreen" unit="px" duration="1s" />
							</span>
						{:then isAlive}
							<svelte:component this={getStatusIcon(isAlive)} />
						{/await}
						<span class="pl-2">
							{device}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<Modal bind:dialog={saveSubnetDialog} on:close>
	<SaveSubnetResult {form} {server} {submitScanResultForm} {subnet} {disabled} />
</Modal>
