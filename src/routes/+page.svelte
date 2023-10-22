<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-screen-lg p-4 items-center mx-auto">
    <h1 class="text-3xl font-bold">Home page</h1>
    <h3 class="text-xl font-bold">This is a Home page</h3>
    {#if data.user}
		<p>Welcome, {data.user.email}</p>
	{:else}
		<div>
			<form action="?/login" method="POST">
				<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
			</form>
		</div>
	{/if}
</div>
