import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';

export async function getCurrentSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getCurrentSession();

    return session?.user;
}