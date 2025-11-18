
import Search from '@/components/search';
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
  return <Search />
}
