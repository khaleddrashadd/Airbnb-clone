import { prisma } from '@/lib/prismadb';

export const getFavorites = async (id) => {
  try {
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in:[...id]
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return favorites;
  } catch (err) {
    throw new Error(err);
  }
};
