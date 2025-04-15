import Link from "next/link";

export default async function CollectionPage() {
    const res = await fetch("http://localhost:4000/movies", { cache: "no-store" });
    const movies = await res.json();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Movie Collection</h1>
            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <ul className="space-y-4">
                    {movies.map((movie) => (
                        <li key={movie.id} className="border p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <p className="font-semibold">#{movie.id}</p>
                                <p className="text-lg">{movie.title}</p>
                            </div>
                            <Link href={`/collection/${movie.id}`} className="text-blue-500 underline">
                                more
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
