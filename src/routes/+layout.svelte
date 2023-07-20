<script>
	import '@fontsource-variable/grandstander'
	import '../app.css'
	import { Globe2 } from 'lucide-svelte'
</script>

<div class="flex flex-col min-h-screen">
	<header class="p-4 bg-teal-600 text-teal-50 flex justify-center">
		<figure class="mr-2">
			<Globe2 />
		</figure>

		<p>World quiz</p>
	</header>

	<main class="p-4 flex-grow flex">
		<slot />
	</main>
</div>
