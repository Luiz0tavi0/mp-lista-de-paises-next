"use client"
import { useEffect, useState } from "react";
import CountryCard from '@/components/country-card';
import { Country } from "@/app/page";

const BASE_URL = 'https://restcountries.com/v3.1/'
const PATH_PARAMS = "fields=name,languages,flags,capital,translations,borders,cca3"

// 	`https://restcountries.com/v3.1/all?fields=name,languages,flags,capital,translations,borders,cca3`
// 	`https://restcountries.com/v3.1/name/{term}?fields=name,languages,flags,capital,translations,borders,cca3`
// "all"
// "name / { term }"
export default function Search() {
	const [term, setTerm] = useState("");
	const [countries, setCountries] = useState<Country[]>([]);
	useEffect(() => {
		const getCountries = async () => {
			try {
				const url = term.trim() ?
					`${BASE_URL}name/${term.trim()}?${PATH_PARAMS}`
					:
					`${BASE_URL}all?${PATH_PARAMS}`
				const response = await fetch(url);
				// console.log(`url usada ${url}`)
				// console.log(`response ${response.ok}`)
				if (response.ok) {
					const data = await response.json();
					// console.log(data)
					setCountries(data);
					return
				}
				setCountries([]);

			} catch (error) {
				setCountries([]);
			}

		};
		const debounce = setTimeout(getCountries, term ? 500 : 0);
		return () => clearTimeout(debounce)
	}, [term])


	return (
		<>
			<div className="container fixed top-[60px] w-full z-50">
				<div className="flex justify-center items-center relative p-5 rounded-[80px] backdrop-blur-md bg-emerald-300/5 gap-3 outline-none">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  text-emerald-500 transition-transform duration-200 hover:text-emerald-700 hover:scale-125"
						fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="7" />
						<path d="M16 16l5 5" />
					</svg>

					<input type="text" name='term' value={term} placeholder="Buscar país..."
						onChange={(e) => setTerm(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Escape')
								setTerm('')
						}}
						className="rounded-md w-[90%] p-2
          bg-white outline-none border-none
          focus:outline-none focus:border-none focus:ring-0"
					/>
				</div>
			</div >
			<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-16'>
				{
					countries.sort((a, b) => {
						if (a.name.common < b.name.common) return -1;
						if (a.name.common > b.name.common) return 1;
						return 0;

					}).map((countrie) =>
						<CountryCard
							name={countrie.name.common}
							ptName={countrie.translations.por.common}
							flag={countrie.flags.svg}
							flagAlt={countrie.flags.alt}
							key={countrie.name.common}
						/>
					)
				}
			</section >
		</>
	)
}