<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-screen-lg p-4 items-center mx-auto">
    <h1 class="text-3xl font-bold">About page</h1>
    <h3 class="text-xl font-bold">This is a About page</h3>
    {#if data.user}
		<p>Welcome, {data.user.email}</p>
	{/if}
</div>
