import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function POST(request, context) {
    const id = context.params.id;

    await fetch(`http://localhost:4000/movies/${id}`, {
        method: 'DELETE',
    });

    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');

    redirect('/admin');
}
