<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let dialog: HTMLDialogElement;
	// export let message: string | undefined | unknown = '';
	export let success: MouseEventHandler<HTMLButtonElement> | null | undefined;
	export let modal: any;
</script>

<div class="relative min-w-96 items-center mx-auto bg-gray-800 p-2 rounded-lg">
	<!-- Modal content -->
	<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
		<!-- Modal header -->
		<div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				{modal.title}
			</h3>
		</div>
		<!-- Modal body -->
		<div class="flex items-center justify-between p-5 ">
      <p class="text-gray-400">
        {modal.content}
      </p>
		</div>
		<!-- Modal footer -->
		<div class="block text-right place-items-end items-end p-4 border-gray-200 rounded-b dark:border-gray-600">
      <button
      on:click|preventDefault={() => dialog.close()}
      type="button"
      class="w-20 ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-2 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      >Cancel</button
			>
			<button
        on:click|preventDefault={success}
				type="submit"
				class="w-20 ml-2 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-600"
				>Delete</button
			>
		</div>
	</div>
</div>
