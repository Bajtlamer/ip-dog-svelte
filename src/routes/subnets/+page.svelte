<script lang="ts">

	const url = 'https://ipdog-api.smes24.com/api/v1/';

	export let data;

	let loading = false;

	$: subnets = data.subnets;
	$: subnetsCount = data.subnets.length;

</script>

<div class="items-center min-h-screen max-w-full p-2 mx-auto bg-gray-800 lg:p-20">
	<div class="block max-w-screen-sm mx-auto p-2">
		<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Search for Subnet list
		</h1>
	</div>
	<div class="max-w-screen-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
		<ul>
			{#each subnets as subnet, index}
			<li
			class:border-b={subnetsCount - 1 > index}
			class=" border-gray-600">
				<dl class="max-w-md text-gray-900 dark:text-white">
					<div class="flex flex-col py-3">
						<dd class="text-lg font-semibold"><a href={`/servers/${subnet.serverId}`}>{subnet.description}</a></dd>
						<dt class="text-gray-500 md:text-md dark:text-gray-400">{subnet.subnet}</dt>
					</div>
				</dl>
			</li>
			{/each}
		</ul>

	</div>
</div>