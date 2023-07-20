<script lang="ts">
	import { Circle } from 'lucide-svelte'
	import { CheckCircle2 } from 'lucide-svelte'

	export let label
	export let name
	export let value
	export let group
</script>

<label class="inline-flex gap-2 items-center bg-teal-50 p-4 rounded border border-teal-100">
	<figure class="unchecked"><Circle /></figure>
	<figure class="checked"><CheckCircle2 /></figure>
	<input type="radio" class="sr-only" bind:group {name} {value} />
	<span>{label}</span>
</label>

<style lang="postcss">
	label {
		@apply cursor-pointer transition-colors duration-150 font-medium text-teal-950;

		& .checked {
			@apply hidden;
		}
	}

	label:has(:checked) {
		@apply bg-teal-600 text-teal-50;

		& .unchecked {
			@apply hidden;
		}

		& .checked {
			@apply block;
		}
	}
</style>
