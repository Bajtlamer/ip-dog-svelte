<script lang="ts">
	import Modal from "../../../modals/modal.svelte";
	import type { ProxyServerInterface } from "../../../models/proxy";
	import type { PageData } from './$types';
    import NewServerScan from '../../../modals/add-network.modal.svelte';

    export let data: PageData;

    let dialog: HTMLDialogElement;
    let server: ProxyServerInterface = data.server;
    
</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
    <div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
        <div class="flex items-center justify-between w-full">
            <a href="/servers/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                &larr; Back
            </a>
        
            <button on:click={() => dialog.showModal()} class="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block">
                Add network 
            </button>
        </div>

        <h1 class="pt-4 text-2xl font-bold text-white">{server.name}</h1>
        <p class="text-white text-xs">{server.hostname}</p>
        <h4 class="text-white text-sm font-bold pt-4">Description:</h4>
        <p class="font-normal text-gray-700 dark:text-gray-400">{server?.description}</p>
        <h2 class="pt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Devices list:
        </h2>
		<ul class="flex justify-between gap-4 text-gray-500 list-inside dark:text-gray-400 hover:shadow-sm">
		</ul>

    </div>
</div>

<Modal bind:dialog on:close>
    <NewServerScan {server}/>
</Modal>



































































