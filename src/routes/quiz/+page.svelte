<script>
	import { fade } from 'svelte/transition'
	import { cubicOut, cubicIn } from 'svelte/easing'
	import { page } from '$app/stores'
	import Results from '$lib/components/Results.svelte'
	import Capital from '$lib/components/question_types/Capital.svelte'
	import Landlocked from '$lib/components/question_types/Landlocked.svelte'
	import Population from '$lib/components/question_types/Population.svelte'
	import Equator from '$lib/components/question_types/Equator.svelte'
	import Language from '$lib/components/question_types/Language.svelte'

	const questions = $page.data.questions
	console.log(questions)

	const components = {
		Capital,
		Landlocked,
		Population,
		Equator,
		Language
	}

	let answers = []
	let step = 1
	let is_finished = false

	$: num_questions = questions.length
	$: num_answers = answers.length
	$: question = questions[step - 1]?.data
	$: type = questions[step - 1]?.type

	$: current_question_component = components[type]

	// Mark as finished when all questions have been answered
	$: if (num_questions === num_answers) {
		is_finished = true
	}

	function on_answer_question({ detail }) {
		answers = [...answers, detail]
		step++
	}
</script>

<div class="w-full">
	<!--
	<p>{JSON.stringify(answers)}</p>
	<p>is_finished {is_finished}</p>
	<p>num_questions {num_questions}</p>
	<p>num_answers {num_answers}</p> -->
	{#key is_finished}
		<div in:fade={{ duration: 500, delay: 300 }}>
			{#if is_finished}
				<Results {questions} {answers} />
			{:else}
				<div>
					<div class="text-center">
						<p class="rounded-full mb-6 bg-zinc-100 inline-flex px-2 py-1">
							{step} / {num_questions}
						</p>
					</div>

					{#key step}
						<div
							in:fade={{ duration: 200, delay: 300, easing: cubicOut }}
							out:fade={{ duration: 200, easing: cubicIn }}
						>
							<figure class="text-center text-4xl">
								{question.flag}
							</figure>

							<svelte:component
								this={current_question_component}
								{question}
								on:answer={on_answer_question}
							/>
						</div>
					{/key}
				</div>
			{/if}
		</div>
	{/key}
</div>
