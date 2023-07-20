<script>
	import Radio from '$lib/components/inputs/Radio.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	$: human_question = `What is the population of ${question.name.common}, in million people?`

	let answer

	$: question_is_answered = answer !== undefined

	const options = [
		['< 5', [0, 5]],
		['5 - 10', [5, 10]],
		['10 - 50', [10, 50]],
		['50 - 100', [50, 100]],
		['100 - 300', [100, 300]],
		['> 300', [300, 1500]]
	]

	function round_to_nearest_million(number) {
		return Math.round(parseFloat(number) / 1000000)
	}

	function on_submit(e) {
		console.log(e.preventDefault())
		e.preventDefault()

		const population_rounded = round_to_nearest_million(question.population)
		const is_correct = population_rounded >= answer[0] && population_rounded < answer[1]

		dispatch('answer', {
			human_question,
			given_answer: `${options.find((item) => item[1] === answer)[0]} million`,
			answer: `${population_rounded} million`,
			is_correct
		})
		answer = undefined
	}
</script>

<form
	method="post"
	class="gap-4 flex flex-col items-center text-center"
	on:submit|preventDefault={on_submit}
>
	<h2>
		{human_question}
	</h2>

	<div class="grid grid-cols-2 gap-4">
		{#each options as [label, value]}
			<Radio name="answer" {label} bind:group={answer} {value} />
		{/each}
	</div>

	<div class="mt-8">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>
</form>
