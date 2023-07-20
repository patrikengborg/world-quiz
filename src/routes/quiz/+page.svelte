<script>
	import { page } from '$app/stores'
	const countries = $page.data.countries

	let answers = []
	let answer = ''
	let step = 1

	$: num_questions = countries.length
	$: question_is_answered = !!answer.trim()
	$: current_question = countries[step - 1]
	$: num_correct_answers = answers.filter((item) => item).length

	function next_step() {
		const is_correct = answer === current_question.capital
		answers = [...answers, is_correct]
		answer = ''
		step++
	}

	function prev_step() {}
</script>

<div class="w-full mt-8">
	{#if step > num_questions}
		<p class="text-center">
			You had {num_correct_answers} correct {num_correct_answers === 1 ? 'answer' : 'answers'}
		</p>
	{:else}
		<form action="" class="gap-4 flex flex-col items-center text-center" on:submit={next_step}>
			{step} / {num_questions}

			<figure class="text-4xl text-center">
				{current_question.flag}
			</figure>

			<h2>
				What is the capital of {current_question.name.common} ?
			</h2>

			<input autofocus type="text" class="border border-gray-200 p-3 w-full" bind:value={answer} />

			<div class="mt-4">
				<button type="submit" class="btn" disabled={!question_is_answered}>Next question</button>
			</div>

			<!-- <div>
				<button type="button" on:click={prev_step}>Back</button>
			</div> -->
		</form>
	{/if}
</div>
