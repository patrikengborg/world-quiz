import shuffle from 'just-shuffle'
import data from '$lib/countries.json'
import random from 'just-random'

export async function load() {
	// Initially tried to use this API, but it wasn't stable, so using local data for now
	/*
	const response = await fetch('https://restcountries.com/v3.1/all')
	const data = await response.json()
	*/

	const question_types = ['Capital', 'Landlocked', 'Population', 'Equator', 'Language']
	//const question_types = ['Capital']

	const num_questions = 10

	const questions = shuffle(data)
		// some countries don't have info about capital
		// Russia not welcome here either
		.filter((item) => item.capital && item.name.common !== 'Russia' && item.population > 500000)
		.slice(0, num_questions)
		.map(({ name, capital, flag, landlocked, population, latlng, languages }) => {
			return {
				type: random(question_types),
				data: {
					name,
					capital,
					population,
					flag,
					landlocked,
					latlng,
					languages
				}
			}
		})

	return {
		questions
	}
}
