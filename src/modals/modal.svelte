<script lang="ts">
	export let dialog:HTMLDialogElement;
</script>

<dialog class="p-0 transition bg-transparent shadow trounded-lg backdrop:bg-neutral-900 backdrop:opacity-40 backdrop:transition"
	bind:this={dialog} on:close>
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
