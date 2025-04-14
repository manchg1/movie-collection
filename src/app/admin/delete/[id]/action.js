'use server';

import { revalidatePath } from 'next/cache';

export async function POST(_, { params }) {
    const id = params.id;

    await fetch(`http://localhost:4000/movies/${id}`, {
        method: 'DELETE',
    });

    // Revalidate affected routes
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');
}
