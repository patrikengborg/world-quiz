import shuffle from 'just-shuffle'
import data from '$lib/countries.json'

export async function load() {
	// Initially tried to use this API, but it wasn't stable, so using local data for now
	/*
	const response = await fetch('https://restcountries.com/v3.1/all')
	const data = await response.json()
	*/

	const countries = shuffle(data)
		.slice(0, 3)
		.map(({ name, capital, flag }) => {
			return {
				name,
				capital: capital[0],
				flag
			}
		})

	return {
		countries
	}
}
