<script lang="ts">
	import { Pulse } from 'svelte-loading-spinners';
	import type { ProxyServerInterface } from '../models/proxy.js';
	import { getServerStatusIcon } from '$lib/functions.js';
	import { validateServer } from '$lib/proxy.js';
	import { browser } from '$app/environment';
    export let server:ProxyServerInterface;
</script>

<div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="flex items-center justify-between w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {server.name}
        <span class="pl-2">
            {#if browser}
            {#await validateServer(server)}
                <span>
                    <Pulse size="20" color="lightgreen" unit="px" duration="1s" />
                </span>
            {:then isAlive}
                <svelte:component this={getServerStatusIcon(isAlive)} />
            {/await}
            {/if}
        </span>
        </h5>
    <span class="block mb-2 text-xs text-white">{server.hostname}</span>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{server.description}</p>
    <a href="/servers/{server._id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Connect
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>