<script lang="ts">
	import { json } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
	
</script>

<div class="items-center max-w-screen-lg p-4 mx-auto">
    <h1 class="text-3xl font-bold">Home page</h1>
    <h3 class="text-xl font-bold">This is a Home page</h3>
    {#if data.user}
		<p>Welcome, {data.user?.username}</p>
	{/if}
</div>
