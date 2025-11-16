'use client'

export default function Loading() {
    const arr = Array.from({ length: 20 })

    return (
        <section className="grid grid-cols-5 container mt-13 gap-3">
            {arr.map((_, index) => (
                <article
                    key={index}
                    className="h-56 w-full p-2 bg-white border-2 rounded-xl animate-pulse"
                >
                    {/* área da “imagem” com ícone */}
                    <div className="w-full h-40 rounded-xl bg-gray-200 flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                        >
                            <path d="M...Z" />
                        </svg>
                    </div>

                    {/* linhas de texto fake */}
                    <div className="mt-3 h-3 w-3/4 mx-auto bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded-full"></div>

                    <span className="sr-only">Loading ...</span>
                </article>
            ))}
        </section>
    )
}
