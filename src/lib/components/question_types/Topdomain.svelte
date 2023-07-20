<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	let answer = ''
	$: question_is_answered = answer.trim()

	function on_submit() {
		// Some countries actually have multiple capitals so answer is an array and not a string
		const is_correct = question.capital.some((item) => item.toLowerCase() === answer.toLowerCase())

		dispatch('answer', { is_correct, answer })
		answer = ''
	}
</script>

<form action="" class="gap-4 flex flex-col items-center text-center" on:submit={on_submit}>
	<h2>
		What is the capital of {question.name.common} ?
	</h2>

	<input autofocus type="text" class="border border-gray-200 p-3 w-full" bind:value={answer} />

	<div class="mt-4">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>
</form>
