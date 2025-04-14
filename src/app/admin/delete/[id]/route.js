import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // ✅ add this line

export async function POST(request, { params }) {
    const id = params.id;

    await fetch(`http://localhost:4000/movies/${id}`, {
        method: 'DELETE',
    });

    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');

    redirect('/admin');
}
