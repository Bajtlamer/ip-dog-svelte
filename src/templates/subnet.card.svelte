<script lang="ts">
	import type { Subnet } from '../models/proxy';
    
    export let subnet: Subnet;
    export let serverId: number;
    console.log(serverId)
</script>

<div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="flex items-center justify-between w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {subnet.description}
        <span>
            <a href="/servers/{serverId}/{subnet?.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Devices
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </span>
    </h5>
    <span class="block mb-2 text-xs text-white">{subnet.subnet}</span>
    
</div>