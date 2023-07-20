import data from '$lib/countries.json'
import shuffle from 'just-shuffle'

export async function load() {
	const flags = shuffle(data).map(({ flag }) => {
		return flag
	})

	return {
		flags
	}
}
