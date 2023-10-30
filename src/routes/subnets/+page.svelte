<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

</script>

<div class="items-center max-w-screen-lg p-4 mx-auto">
    <h1 class="text-3xl font-bold">Subnets pagesss</h1>
    <h3 class="text-xl font-bold">This is a Subnet page</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore ipsum ut molestias veniam nostrum ex consectetur aliquid repellendus? Corporis atque cum excepturi pariatur ex commodi et corrupti laudantium aliquam.</p>
    {#if data.user}
		<p>Welcome, {data.user?.username}</p>
	{/if}
</div>
