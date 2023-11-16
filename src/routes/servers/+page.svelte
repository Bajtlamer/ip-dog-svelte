<script lang="ts">
import Modal from '../../modals/modal.svelte';
import type { ActionData, SubmitFunction } from './$types';
import NewServer from '../../modals/add-server.modal.svelte';
import type { ProxyServer } from '../../models/proxy';
import type { PageData } from './$types';
import Server from '../../templates/server.card.svelte'

let dialog:HTMLDialogElement;
let submitting = false;
let error: string | undefined | unknown = '';
let form: ActionData;
// let proxyServers:ProxyServer[];
export let data: PageData;
$: ({proxyServers} = data)

const submitNewServer: SubmitFunction= ({ formElement, formData, action, cancel, submitter }) => {
    		const req = Object.fromEntries(formData);
    		// console.log(req);
    
    		submitting = true;
    		return async ({ result, update }) => {
    			if (result.type === 'success') {
    				console.log('->', result);
                    dialog.close();
    				const _data = result.data;
    				error = _data?.error;
                }else if(result.type === 'failure') {
                    error = result.data?.message;
                }
    
    			submitting = false;
    		};
    
};
</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
    <div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
        <button on:click={() => dialog.showModal()} class="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block">
            Add server 
        </button>

		<p class="my-3 font-normal text-gray-700 dark:text-gray-400">
			To add serve, you need to provide server address and login credentials.
		</p>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Servers list:
        </h2>
		<ul class="flex justify-between gap-4 text-gray-500 list-inside dark:text-gray-400 hover:shadow-sm">
			{#each proxyServers as server, index}
				<li id={index.toString()} class="flex items-center">
					<Server  {server}/>
					<!-- {server.name} -->
				</li>
			{/each}
		</ul>

    </div>
</div>


<Modal bind:dialog on:close>
    <NewServer {submitNewServer} {dialog} {error}/>
</Modal>