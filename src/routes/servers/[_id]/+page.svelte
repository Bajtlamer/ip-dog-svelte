<script lang="ts">
	import type { SecureProxyServer } from "../../../models/proy.server";
	import type { PageData } from './$types';
    
    export let data: PageData;
    let server:SecureProxyServer = data._server;
</script>

<div class="items-center h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
    <div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
        <button class="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block">
            Scan networks on {server.name}
        </button>

		<p class="my-3 font-normal text-gray-700 dark:text-gray-400">
			To add serve, you need to provide server address and login credentials.
		</p>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Network devices list:
        </h2>
		<ul class="flex justify-between gap-4 text-gray-500 list-inside dark:text-gray-400 hover:shadow-sm">
		</ul>

    </div>
</div>





































































