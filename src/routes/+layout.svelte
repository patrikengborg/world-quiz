<script>
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import '@fontsource-variable/grandstander'
	import '../app.css'
	import { Globe2 } from 'lucide-svelte'
</script>

<div class="flex flex-col d-h-screen text-zinc-800">
	<header class="p-4 bg-teal-600 text-teal-50 items-center grid grid-cols-3">
		<a href="/" class:opacity-0={$page.url.pathname === '/'} class="text-sm">Cancel</a>

		<div class="flex items-center">
			<figure class="mr-2">
				<Globe2 />
			</figure>

			<p>World quiz</p>
		</div>
	</header>

	{#key $page.url}
		<main class="p-4 my-4 flex-grow flex overflow-scroll" in:fade={{ duration: 200, delay: 400 }}>
			<slot />
		</main>
	{/key}
</div>
