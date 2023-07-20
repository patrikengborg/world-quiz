<script>
	import Radio from '$lib/components/inputs/Radio.svelte'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	$: human_question = `Is ${question.name.common} a landlocked country?`

	const options = [
		['Yes', true],
		['No', false]
	]

	let answer

	$: question_is_answered = answer !== undefined

	function on_submit() {
		const is_correct = answer === question.landlocked

		dispatch('answer', {
			human_question,
			given_answer: answer,
			answer: question.landlocked ? 'Yes' : 'No',
			is_correct
		})

		answer = undefined
	}
</script>

<form action="" class="gap-4 flex flex-col items-center text-center" on:submit={on_submit}>
	<h2>
		{human_question}
		<small class="block mt-3"
			>💡 A landlocked country doesn't have any coastline. It is completely surrounded by other
			countries.</small
		>
	</h2>

	<div class="grid grid-cols-2 gap-4">
		{#each options as [label, value]}
			<Radio name="answer" {label} bind:group={answer} {value} />
		{/each}
	</div>

	<div class="mt-4">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>

	<!-- <div>
				<button type="button" on:click={prev_step}>Back</button>
			</div> -->
</form>
