<script>
	import { onMount } from 'svelte'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	$: human_question = `What is the capital of ${question.name.common}?`

	let input

	$: if (human_question) {
		try {
			input.focus()
		} catch (e) {}
	}

	let answer = ''
	$: question_is_answered = answer.trim()

	function on_submit() {
		// Some countries actually have multiple capitals so answer is an array and not a string
		const is_correct = question.capital.some((item) => item.toLowerCase() === answer.toLowerCase())

		dispatch('answer', {
			human_question,
			given_answer: answer,
			answer: question.capital.join(', '),
			is_correct
		})

		answer = ''
	}
</script>

<form action="" class="gap-4 flex flex-col items-center text-center" on:submit={on_submit}>
	<h2>
		{human_question}
	</h2>

	<input
		bind:this={input}
		type="text"
		class="border border-gray-200 p-3 w-full"
		bind:value={answer}
	/>

	<div class="mt-4">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>

	<!-- <div>
				<button type="button" on:click={prev_step}>Back</button>
			</div> -->
</form>
