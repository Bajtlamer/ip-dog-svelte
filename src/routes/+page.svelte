<script lang="ts">
	// import { json } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
console.log(data)
</script>

<div class="items-center min-h-screen max-w-full p-2 mx-auto dark:text-gray-200 dark:bg-gray-800 lg:p-20">

	<div class="items-center max-w-screen-lg p-4 mx-auto">
		<h1 class="text-3xl font-bold">Home page</h1>
		<h3 class="text-xl font-bold">This is a Home page</h3>
		{#if data.user}
		<p>Welcome, {(data.user.fullname)?data.user?.fullname:data.user?.username} ...</p>
		{/if}
	</div>
</div>