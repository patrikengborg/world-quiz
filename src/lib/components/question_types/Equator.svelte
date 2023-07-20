<script>
	import Radio from '$lib/components/inputs/Radio.svelte'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	$: human_question = `Is ${question.name.common} above or below the equator?`

	const options = [
		['Above', 'above'],
		['Below', 'below']
	]

	let answer

	$: question_is_answered = answer !== undefined

	function on_submit() {
		const above_or_below = question.latlng[0] >= 0 ? 'above' : 'below'

		const is_correct = answer === above_or_below

		dispatch('answer', {
			human_question,
			given_answer: answer,
			answer: above_or_below,
			is_correct
		})

		answer = undefined
	}
</script>

<form action="" class="gap-4 flex flex-col items-center text-center" on:submit={on_submit}>
	<h2>{human_question}</h2>

	<div class="grid grid-cols-2 gap-4">
		{#each options as [label, value]}
			<Radio name="answer" {label} bind:group={answer} {value} />
		{/each}
	</div>

	<div class="mt-4">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>
</form>
