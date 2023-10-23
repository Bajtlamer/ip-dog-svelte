<script lang="ts">
    import type { PageData } from './$types';
    import { redirect } from "@sveltejs/kit"
    import { page } from '$app/stores';
    export let data: PageData;

    if ($page.url.pathname === "/subnets") {
        console.log($page.url.pathname)
        // throw redirect(303, "/")
	}   
</script>

<div class="max-w-screen-lg p-4 items-center mx-auto">
    <h1 class="text-3xl font-bold">Subnets pagesss</h1>
    <h3 class="text-xl font-bold">This is a Subnet page</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore ipsum ut molestias veniam nostrum ex consectetur aliquid repellendus? Corporis atque cum excepturi pariatur ex commodi et corrupti laudantium aliquam.</p>
</div>
