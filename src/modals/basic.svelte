<script lang="ts">
    
	export let showModal = false; // boolean

	let dialog:any = null; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<!-- <slot name="header" /> -->
		<!-- <hr /> -->
		<slot />
		<!-- <hr /> -->
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button type="button" on:click={() => dialog.close()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 mt-2 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block">Close</button> -->
		
	</div>
</dialog>

<style>
	dialog::backdrop {
		/* background: none; */
		/* background: rgba(0, 1, 2, 0.4); */
		/* border-radius: 0.2rem; */
	}
	dialog > div {
		/* padding: 1em; */
		/* background: none; */
		/* position: relative; */
    /* width: 100%;
	padding: 0;
	margin:0; */
    /* max-width: 100%;
    max-height: 100%; */
    /* margin: 2rem auto; */
	/* margin:20px; */
    /* color: black;
    border-radius: 0.5rem;
	padding: 20px; */
    /* background: black; */
	/* background: rgba(0, 0, 0, 0.1); */
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.6s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	

</style>
