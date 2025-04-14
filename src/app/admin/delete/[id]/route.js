// src/app/admin/delete/[id]/route.js
import { revalidatePath } from 'next/cache';

export async function POST(request, { params }) {
    const id = params.id;

    await fetch(`http://localhost:4000/movies/${id}`, {
        method: 'DELETE',
    });

    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');

    return new Response(null, { status: 200 });
}
