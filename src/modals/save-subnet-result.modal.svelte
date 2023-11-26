<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ProxyServerInterface } from '../models/proxy';
	import type { ActionData } from '../routes/subnets/$types';
    export let server: ProxyServerInterface;
    export let subnet: string;
    export let message: string|undefined;
    export let submitScanResultForm: SubmitFunction;

    let form: ActionData;

</script>

<div class="w-72 min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="inline-flexn w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Save scan result
    </h5>
    <div class="text-sm text-white mb-4">({server.name})</div>
    <div>
        <form action="/subnets?/save_subnet_result" method="POST" class="space-y-4 md:space-y-6" use:enhance|preventDefault={submitScanResultForm}>
            <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Subnet name</label
                >
                <input
                    bind:value={subnet}
                    type="text"
                    name="subnet"
                    id="subnet"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Subnet name"
                />
                {#if form?.invalidSubnet}<p class="text-red-500 text-sm">Invalid subnet</p>{/if}
            </div>
            <div>
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea name="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write server description here...">

                    </textarea>
            </div>
            <div>
				<button
                    formaction="/subnets?/save_subnet_result"
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center w-full"
				    >Save Result
                </button>

            </div>
    </form>
            {#if message}<p class="text-red-500 text-sm">{message}</p>{/if}
            {#if form?.message}<p class="text-red-500 text-sm">{form.message}</p>{/if}
    </div>

</div>
