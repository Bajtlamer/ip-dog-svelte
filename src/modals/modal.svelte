<script lang="ts">
	export let dialog:HTMLDialogElement;
</script>

<dialog class="min-w-full md:min-w-fit p-0 px-2 md:mx-auto mt-2 md:mt-64 transition bg-transparent shadow-2xl trounded-lg backdrop:bg-neutral-900 backdrop:opacity-70 backdrop:transition"
	bind:this={dialog}>
	<div>
		<slot />
	</div>
</dialog>

<style>
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
		animation: fade 0.2s ease-out;
	}
</style>
