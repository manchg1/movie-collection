import EditForm from './EditForm';

export default async function EditMoviePage({ params }) {
    const res = await fetch(`http://localhost:4000/movies/${Number(params.id)}`);
    const movie = await res.json();

    if (!movie.id) {
        return <p className="text-red-600 p-4">Movie not found.</p>;
    }

    return (
        <main className="p-6">
            <h1 className="text-xl font-bold mb-4">Edit Movie</h1>
            <EditForm movie={movie} />
        </main>
    );
}