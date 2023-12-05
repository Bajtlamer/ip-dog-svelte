<script lang="ts">
	import type { PageData } from './$types';
    import Device from '../../../../templates/device.card.svelte'
	import { CSubnet, type iSubnet } from '../../../../models/subnet';
	import Modal from '../../../../modals/modal.svelte';
	import { CDevice, type iDevice } from '../../../../models/device';
	import type { ProxyServerInterface } from '../../../../models/proxy';
	import { onMount } from 'svelte';
	import type { TDevice } from '../../../../models/types';

    export let data: PageData;

    let dialog: HTMLDialogElement;
    let serverId: number = data.serverId;
    // let subnetId: number = data.subnetId;
    // let subnet: iSubnet = data.subnet;
    // let server: ProxyServerInterface | null = data.server;
    // let Subnet = new CSubnet(subnet);
    let devicesCount: number = 0;
    // let devices: iDevice[] = [];

    // onMount(async () => {
    //     if ("devices" in subnet) {
    //         if (Array.isArray(subnet.devices)) {
    //             console.log(subnet.devices)
    //             devices = subnet.devices;
    //             devicesCount = subnet.devices.length;
    //         }
    //     }
	// });

    // const submitDeviceForm: SubmitFunction = async ({ formData, cancel }) => {
    //     console.log('submitting device form');

    //     return async ({ result, update }) => {
	// 		if (result.type === 'success') {
	// 			const data = result.data;

	// 			if (data) {
	// 				subnetFormDialog.close();
	// 				await invalidate('server:subnets');
	// 			}
	// 		} else if (result.type === 'failure') {
	// 			message = result.data?.message;
	// 			cancel();
	// 		}

	// 		loader = false;
	// 	};

    // };

    // $: Subnet = new CSubnet(subnet);
    $: ({ subnet } = data);
    $: ({ server } = data);
    // $: ({ devices } = data.subnet);

</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
    <div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
        <div class="flex items-center justify-between w-full">
            <a href="/servers/{serverId}/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                &larr; Back
            </a>
            <h1 class="text-2xl font-bold text-white">DEVICES</h1>
            <button on:click={() => dialog.showModal()} class="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block">
                Add network
            </button>
        </div>

        <h1 class="pt-4 text-2xl font-bold text-white">{subnet.description}</h1>
        <p class="text-white text-xs">{subnet.subnet}</p>
        <!-- <h4 class="text-white text-sm font-bold pt-4">Description:</h4>
        <p class="font-normal text-gray-700 dark:text-gray-400">{Subnet?.description}</p> -->
        <h2 class="pt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Devices list:
        </h2>
		<ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <!-- {#if Subnet?.devices} -->
            {#each subnet.devices as device, index}
            <li class:mb-1={devicesCount - 1 > index}
                id={index.toString()}
                class="py-3 px-3 sm:py-4 bg-slate-700 border-gray-600 rounded-md">
                <!-- {device.description} -->
                <Device device={new CDevice(device)} iServer={server}/>
            </li>
        {/each}
        <!-- {/if} -->
    	</ul>
    </div>
</div>































































