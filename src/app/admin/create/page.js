'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMoviePage() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

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
            <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} className="border w-full p-1" />
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border w-full p-1" />
            <input placeholder="Director" value={director} onChange={e => setDirector(e.target.value)} className="border w-full p-1" />
            <input placeholder="Release Year" value={year} onChange={e => setYear(e.target.value)} className="border w-full p-1" />
            <button className="bg-blue-600 text-white px-3 py-1">Create</button>
        </form>
    );
}
