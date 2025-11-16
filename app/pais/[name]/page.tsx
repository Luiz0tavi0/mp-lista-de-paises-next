import type { Country } from '@/app/page'
import Link from 'next/link'
import Image from 'next/image'
import arrowBack from "@/public/arrow-back.svg";
import CountryCard from '@/components/country-card';

type CountryPage = Country & {
  region: string;
  subregion: string;
  languages: {
    [key: string]: string
  };
  borders: string[];
  population: number;

};

async function getCountryBorderByCodes(
  cca3List: string[]
): Promise<Array<Country>> {

  const url = `https://restcountries.com/v3.1/alpha?codes=${cca3List.join(',')}`

  const response: Response = await fetch(url)
  const data: Array<Country> = await response.json()

  return data
}

async function getCountryByName(name: string): Promise<CountryPage> {
  const url = `https://restcountries.com/v3.1/name/${name.toLowerCase()}?fullText=true`
  const response = await fetch(url)
  const data = await response.json()
  return data[0]
}

type CountryPageParams = {
  params: { name: string }
}

export default async function CountryPage({ params: { name } }: CountryPageParams) {
  const country = await getCountryByName(name);
  let borderCountries = null
  if (country?.borders) {
    borderCountries = await getCountryBorderByCodes(country.borders);
  }
  console.log(borderCountries)
  const formater = Intl.NumberFormat('en', { notation: 'compact' });

  if (!country) {
    return (
      <div className="container text-center mt-20">
        <h1 className="text-3xl font-bold">País não encontrado</h1>
        <Link className="text-indigo-600 underline mt-4 inline-block" href="/">Voltar</Link>
      </div>
    )
  }
  return (
    <section className='container flex flex-col'>
      <h1 className='text-5xl text-center font-bold text-gray-800 my-16'>
        {country?.translations && country.translations.por.common}
      </h1>

      <Link className='flex py-2 items-center gap-1' href='/'>
        <Image src={arrowBack} width={24} height={24} alt='icone da seta voltar' />
        Voltar
      </Link>

      <article className='flex
      md:flex-row
      flex-col-reverse
      justify-between min-w-full p-10 bg-white'>
        <section>
          {country?.capital &&
            <h2 className='text-xl text-gray-800'>
              <b>🏢 Capital: </b>{country.capital}
            </h2>}

          <h2 className='text-xl text-gray-800'>
            <b>🗺️ Continente: </b> {country?.region}{country?.subregion && ` - ${country.subregion}`}
          </h2>

          <h2 className='text-xl text-gray-800'>
            <b>👩‍👩‍👦 População: </b> {formater.format(country?.population)}
          </h2>
          {
            country?.languages &&
            (<h2 className='text-xl text-gray-800'>

              <b>🗣️ Línguas faladas: </b>
              <br />

              {
                Object.values(country.languages).map((language) => (
                  <span
                    key={language}
                    className='inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full'
                  >
                    {language}
                  </span>
                ))
              }
            </h2>)
          }
        </section>
        <div className='
        mb-2
        relative h-48 md:h-auto md:mb-0 w-96 shadow-md rounded-md overflow-hidden
        '>
          <Image
            fill
            className="object-fill"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </div>


      </article>
      <section>
        {borderCountries &&
          <><h3 className='mt-12 text-2xl font-semibold text-gray-800'>Países que fazem fronteira</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2">
              {borderCountries.map((border) => (
                <CountryCard
                  key={border.cca3}
                  name={border.name.common}
                  ptName={border.translations.por.common}
                  flag={border.flags.svg}
                  flagAlt={border.flags.alt}
                />
              ))}
            </div>
          </>
        }
      </section>
    </section>
  )
}
