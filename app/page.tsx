import CountryCard from '@/components/country-card';
import Image from 'next/image'
import Link from 'next/link';

const getCountries = async (): Promise<Country[]> => {
  // const url = 'https://restcountries.com/v3.1/all?fields=name,languages,capital,translations'
  const url = 'https://restcountries.com/v3.1/all?fields=name,languages,flags,capital,translations,borders'
  // const url = 'https://restcountries.com/v3.1/name/Syrian Arab Republic?fullText=true'
  const response = await fetch(url);
  return response.json()
}

export type Country = {
  name: {
    common: string,
    official: string
  },
  translations: { por: { common: string } },
  flags: {
    svg: string,
    alt: string,

  }, capital: string;
  cca3: string;
}

export default async function Home() {
  const countries = await getCountries();
  console.log(countries[0])
  return (
    <section className='grid 
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    w-full container gap-2 mt-16'>
      {
        countries.map((countrie) =>
          <CountryCard
            name={countrie.name.common}
            ptName={countrie.translations.por.common}
            flag={countrie.flags.svg}
            flagAlt={countrie.flags.alt}
            key={countrie.name.common}
          />

        )

      }
    </section >)
}
