<script>
	import { Brain, Rocket, Medal, Library } from 'lucide-svelte'

	export let answers
	export let questions

	$: num_questions = questions.length
	$: prc_correct = (num_correct_answers / num_questions) * 100
	$: num_correct_answers = answers.filter((item) => item.is_correct).length

	const icon_size = 36
</script>

<div class="pb-8">
	<p class="text-center text-lg flex-col leading-snug items-center flex gap-3 justify-center mb-8">
		{#if prc_correct === 100}
			<figure class="icon">
				<Brain size={icon_size} />
			</figure>
			<span>Full score – what a legend!</span>
		{:else if prc_correct > 70}
			<figure class="icon"><Rocket size={icon_size} /></figure>
			<span>Very good, some more practice and you got this!</span>
		{:else if prc_correct > 50}
			<figure class="icon"><Medal size={icon_size} /></figure>
			<span>Not too bad, but you can probably do a bit better.</span>
		{:else}
			<figure class="icon"><Library size={icon_size} /></figure>
			<span>Not overly impressive, please spend the next week at the library.</span>
		{/if}
	</p>

	<p class="text-center mb-4 pb-1 mt-2">
		You had <strong> {num_correct_answers}</strong> correct {num_correct_answers === 1
			? 'answer'
			: 'answers'}
	</p>

	<ul class="mb-12 text-sm">
		{#each answers as item, idx}
			<li
				class="grid px-4 py-3 grid-cols-4 mb-3 rounded {item.is_correct
					? 'text-teal-950 bg-teal-50'
					: 'text-rose-950 bg-rose-50'}"
			>
				<figure class="text-2xl">
					{item.is_correct ? '😃' : '😩'}
				</figure>

				<div class="col-span-3">
					<h2 class="relative leading-tight mb-2 text-lg">
						<strong class="absolute -left-6">{idx + 1}</strong>
						{JSON.stringify(item.human_question)}
					</h2>
					<p>You answered: <strong class="capitalize">{item.given_answer}</strong></p>
					<p>Correct answer: <strong class="capitalize">{item.answer}</strong></p>
				</div>
			</li>
		{/each}
	</ul>

	<p class="text-center"><a href="/" class="btn">Take the quiz again</a></p>
</div>

<style lang="postcss">
	.icon {
		@apply text-teal-600 flex-shrink-0;
	}
</style>
