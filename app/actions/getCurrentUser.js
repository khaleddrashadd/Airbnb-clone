import { getServerSession } from 'next-auth';
import { OPTIONS } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prismadb';

export const getSession = async () => {
  return await getServerSession(OPTIONS);
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
