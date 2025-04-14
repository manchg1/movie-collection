import Link from "next/link";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:4000/movies");
    const movies = await res.json();
    return movies.slice(0, 10).map((movie) => ({
        id: movie.id.toString(),
    }));
}

export default async function MovieDetailPage({ params }) {
    const res = await fetch(`http://localhost:4000/movies/${params.id}`);

    if (!res.ok) {
        return (
            <main className="p-6">
                <p className="text-red-600 font-semibold">
                    No movie with ID {params.id} exists.
                </p>
                <Link href="/collection" className="text-blue-500 underline">← Back</Link>
            </main>
        );
    }

    const movie = await res.json();

    return (
        <main className="p-6">
            <Link href="/collection" className="text-blue-500 underline mb-4 block">← Back</Link>
            <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
            <table className="table-auto border-collapse border border-gray-400">
                <tbody>
                <tr>
                    <td className="border px-4 py-2 font-semibold">ID</td>
                    <td className="border px-4 py-2">{movie.id}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 font-semibold">Title</td>
                    <td className="border px-4 py-2">{movie.title}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 font-semibold">Director</td>
                    <td className="border px-4 py-2">{movie.director}</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 font-semibold">Release Year</td>
                    <td className="border px-4 py-2">{movie.release_year}</td>
                </tr>
                </tbody>
            </table>
        </main>
    );
}
