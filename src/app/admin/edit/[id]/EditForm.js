'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ movie }) {
    const [form, setForm] = useState(movie);
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const validate = () => {
        const errs = [];
        if (form.title.trim().length < 2) {
            errs.push("Title must be at least 2 characters.");
        }
        if (!form.director.trim()) {
            errs.push("Director is required.");
        }
        const currentYear = new Date().getFullYear();
        if (form.release_year > currentYear) {
            errs.push("Release year cannot be in the future.");
        }
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (errs.length > 0) {
            setErrors(errs);
            return;
        }

        await fetch(`http://localhost:4000/movies/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        router.push("/admin");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Movie</h2>

            {errors.length > 0 && (
                <ul>
                    {errors.map((e, i) => (
                        <li key={i} style={{ color: "red" }}>{e}</li>
                    ))}
                </ul>
            )}

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

            <button type="submit">Save</button>
        </form>
    );
}
