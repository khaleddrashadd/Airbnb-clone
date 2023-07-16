import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prismadb';

export const getSession = async () => {
  return await getServerSession(options);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    const { user } = session;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    return currentUser;
  } catch (err) {
    return null;
  }
};
