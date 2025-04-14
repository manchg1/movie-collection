import Link from "next/link";

export default async function AdminPage() {
    const res = await fetch("http://localhost:4000/movies", { cache: "no-store" });
    const movies = await res.json();

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-3">Admin Panel</h1>
            <Link href="/admin/create" className="text-green-600 underline mb-3 block">Create New</Link>

            <table className="border w-full text-sm">
                <thead>
                <tr>
                    <th className="border px-2">ID</th>
                    <th className="border px-2">Title</th>
                    <th className="border px-2">Director</th>
                    <th className="border px-2">Year</th>
                    <th className="border px-2">E</th>
                    <th className="border px-2">D</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((m) => (
                    <tr key={m.id}>
                        <td className="border px-2">{m.id}</td>
                        <td className="border px-2">{m.title}</td>
                        <td className="border px-2">{m.director}</td>
                        <td className="border px-2">{m.release_year}</td>
                        <td className="border text-center">
                            <Link href={`/admin/edit/${m.id}`}>E</Link>
                        </td>
                        <td className="border text-center">
                            <form action={`/admin/delete/${m.id}`} method="POST">
                                <button>D</button>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
}
