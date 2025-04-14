'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMoviePage() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const validate = () => {
        const errs = [];
        const currentYear = new Date().getFullYear();

        if (!id.trim() || isNaN(Number(id))) errs.push("ID must be a valid number.");
        if (title.trim().length < 2) errs.push("Title must be at least 2 characters.");
        if (!director.trim()) errs.push("Director is required.");
        if (!year.trim() || isNaN(Number(year)) || Number(year) > currentYear)
            errs.push("Release year must be a valid number and not in the future.");

        return errs;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const errs = validate();
        if (errs.length > 0) {
            setErrors(errs);
            return;
        }

        await fetch("http://localhost:4000/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: Number(id),
                title,
                director,
                release_year: Number(year),
            }),
        });

        router.push("/admin");
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-3 max-w-sm">
            <h1 className="text-lg font-bold">Add Movie</h1>

            {errors.length > 0 && (
                <ul className="text-red-600 text-sm list-disc list-inside">
                    {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            )}

            <input
                placeholder="ID"
                value={id}
                onChange={e => setId(e.target.value)}
                className="border w-full p-1"
            />
            <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="border w-full p-1"
            />
            <input
                placeholder="Director"
                value={director}
                onChange={e => setDirector(e.target.value)}
                className="border w-full p-1"
            />
            <input
                placeholder="Release Year"
                value={year}
                onChange={e => setYear(e.target.value)}
                className="border w-full p-1"
            />

            <button className="bg-blue-600 text-white px-3 py-1">Create</button>
        </form>
    );
}
