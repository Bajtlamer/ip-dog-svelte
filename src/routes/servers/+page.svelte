<script lang="ts">
import Modal from '../../modals/modal.svelte';
import type { SubmitFunction } from './$types';
import NewServer from '../../modals/add-server.modal.svelte';
import type { ProxyServerInterface } from '../../models/proxy';
import type { PageData } from './$types';
import Server from '../../templates/server.card.svelte'

let dialog:HTMLDialogElement;
let submitting = false;
let message: string | undefined | unknown = '';

export let data: PageData;

let proxyServers: ProxyServerInterface[];
$: ({proxyServers} = data)

const submitNewServer: SubmitFunction= ({ formData, cancel, submitter }) => {
    		const req = Object.fromEntries(formData);
    
    		submitting = true;
    		return async ({ result, update }) => {
    			if (result.type === 'success') {
					update();

                    dialog.close();
                }else if(result.type === 'failure') {
					message = result?.data?.message;
					cancel();
                }
    
    			submitting = false;
    		};
    
};
</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
    <div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-600 dark:border-gray-700">
        <button on:click={() => dialog.showModal()} class="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block">
            Add server 
        </button>

		<p class="my-3 font-normal text-gray-700 dark:text-gray-400">
			To add serve, you need to provide server address and login credentials.
		</p>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Servers list:
        </h2>
		<ul class="block justify-betweenw text-gray-500 list-inside dark:text-gray-400 hover:shadow-sm">
			{#each proxyServers as server, index}
				<li id={server.id?.toString()} class="block shadow-lg my-2 items-center min-w-full">
					<Server {server}/>
				</li>
			{/each}
		</ul>

    </div>
</div>


<Modal bind:dialog on:close>
    <NewServer {submitNewServer} {dialog} {message}/>
</Modal>