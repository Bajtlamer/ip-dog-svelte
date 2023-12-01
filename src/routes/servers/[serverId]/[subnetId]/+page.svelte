<script lang="ts">
	import type { PageData } from './$types';
    import Device from '../../../../templates/device.card.svelte'
	import type { CSubnet } from '../../../../models/subnet';
	import Modal from '../../../../modals/modal.svelte';
	import { CDevice } from '../../../../models/device';

    export let data: PageData;

    let dialog: HTMLDialogElement;
    let serverId: number = data.serverId;
    let subnetId: number = data.subnetId;
    let subnet: CSubnet = data.subnet;
    
    const submitDeviceForm = () => {

    };

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
        <h4 class="text-white text-sm font-bold pt-4">Description:</h4>
        <p class="font-normal text-gray-700 dark:text-gray-400">{subnet?.description}</p>
        <h2 class="pt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Devices list:
        </h2>
		<ul class="block justify-between gap-4 text-gray-500 list-inside dark:text-gray-400 hover:shadow-sm">
            {#if subnet?.devices}
            {#each subnet?.devices as device, index}
            <li id={index?.toString()} class="block shadow-lg my-2 items-center min-w-full">
                <Device device={new CDevice(device)} {subnetId} {serverId}/>
            </li>
        {/each}
        {/if}
    	</ul>
    </div>
</div>































































