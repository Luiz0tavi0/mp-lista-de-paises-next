'use client'


export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    console.log(error);
    return (
        <div className="p-10">
            <h2>Algo deu errado.</h2>
            <button onClick={() => reset()}>Tentar novamente</button>
        </div>
    )
}
