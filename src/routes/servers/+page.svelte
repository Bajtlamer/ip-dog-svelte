<script lang="ts">
import Modal from '../../modals/modal.svelte';
import type { ActionData, SubmitFunction } from './$types';
import NewServer from '../../modals/add-server.modal.svelte';

let dialog:HTMLDialogElement;
let submitting = false;
let error: string | undefined | unknown = '';
let form: ActionData;

const submitNewServer: SubmitFunction= ({ formElement, formData, action, cancel, submitter }) => {
    		const req = Object.fromEntries(formData);
    		// console.log(req);
    
    		submitting = true;
    		return async ({ result, update }) => {
    			if (result.type === 'success') {
    				console.log('->', result);
                    dialog.close();
    				const _data = result.data;
    				// subnet = _data?.subnet;
    				// devices = _data?.devices || [];
    				// devices.push('10.0.1.11');
    				// devices.push('172.16.24.224');
    				// count = _data?.count || 0;
    				error = _data?.error;
                }else if(result.type === 'failure') {
                    error = result.data?.message;
                    console.log('chyba', error);
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

		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
			To add serve, you need to provide server address and login credentials.
		</p>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Servers list:
        </h2>
    </div>
</div>


<Modal bind:dialog on:close>
    <NewServer {submitNewServer} {dialog} {error}/>
</Modal>