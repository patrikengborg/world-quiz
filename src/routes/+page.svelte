<script>
	import { page } from '$app/stores'

	let flag_index = 0

	$: flags = $page.data.flags
	$: flag = flags[flag_index]

	function update_flag_index() {
		setTimeout(() => {
			if (flag_index < flags.length - 1) {
				flag_index++
				update_flag_index()
			}
		}, 50 + flag_index * 1)
	}

	update_flag_index()
</script>

<div class="text-center w-full my-auto">
	<figure
		class="absolute origin-center translate-x-1/2 left-1/2 -mt-16"
		style="transform:scale({1 + flag_index * 0.05});opacity:{1 - flag_index * 0.003};"
	>
		{flag}
	</figure>

	<div class="mb-8">
		<h1 class="font-medium text-xl mb-2">Welcome to the World quiz!</h1>

		<p class="text-zinc-500">Let's find out how much you know about our planet and its places.</p>
	</div>

	<a href="/quiz" class="btn">Get started!</a>
</div>
