import Link from "next/link";
import Image from "next/image";
type CountryCard = {

    name: string;
    ptName: string;
    flag: string;
    flagAlt: string;
}
export default function CountryCard({ name, ptName, flag, flagAlt }: CountryCard) {
    return (
        <Link href={`/pais/${name}`}>
            <article key={name}
                className="h-56 w-full p-2 bg-white border-2 rounded-xl
            hover:border-indigo-200 hover:shadow-xl
            transition-all">
                <div className='relative w-full h-40 p-2 overflow-hidden rounded-xl
                            
            '>
                    <Image
                        className="object-cointain"
                        src={flag}
                        alt={flagAlt}
                        fill
                    />

                </div>
                <h1 className='font-bold text-xl text-center mt-1 break-words'>{ptName}</h1>
            </article>
        </Link>)
}