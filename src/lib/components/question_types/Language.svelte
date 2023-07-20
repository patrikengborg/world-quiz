<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let question
	$: human_question = `Name an official language in ${question.name.common}`

	let answer = ''
	$: question_is_answered = answer.trim()

	$: languages = Object.values(question.languages)
	$: num_langs = languages.length

	function on_submit() {
		// Some countries actually have multiple capitals so answer is an array and not a string
		const is_correct = languages.some((item) => item.toLowerCase() === answer.trim().toLowerCase())

		dispatch('answer', {
			human_question,
			given_answer: answer,
			answer: languages.join(', '),
			is_correct
		})

		answer = ''
	}
</script>

<form
	method="post"
	class="gap-4 flex flex-col items-center text-center"
	on:submit|preventDefault={on_submit}
>
	<h2>
		Name an official language in {question.name.common}<br />
		<small class="block mt-3"
			>💡 there {num_langs === 1 ? 'is just one language' : `are ${num_langs} languages`}</small
		>
	</h2>

	<input autofocus type="text" class="border border-gray-200 p-3 w-full" bind:value={answer} />

	<div class="mt-8">
		<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
	</div>
</form>
