'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ movie }) {
    const [form, setForm] = useState(movie);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:4000/movies/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        router.push("/admin");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Movie</h2>

            <input
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title"
            /><br />

            <input
                name="director"
                value={form.director}
                onChange={(e) => setForm({ ...form, director: e.target.value })}
                placeholder="Director"
            /><br />

            <input
                type="number"
                name="release_year"
                value={form.release_year}
                onChange={(e) => setForm({ ...form, release_year: parseInt(e.target.value) })}
                placeholder="Release Year"
            /><br />

            <button>Save</button>
        </form>
    );
}
